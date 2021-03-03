using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Model.Options;
using QuantumBudget.Model.Mappers;
using QuantumBudget.Model.Models;
using QuantumBudget.Services;

namespace QuantumBudget.API.Controllers
{
    [Route("[controller]")]
    public class PaymentsController : Controller
    {
        private readonly JwtToken _jwtToken;
        private readonly StripeEventHandlerService _stripeEventHandlerService;
        private readonly IUserManagementService _userManagementService;
        private readonly StripePaymentService _stripePaymentService;

        public PaymentsController(JwtToken jwtToken,
            StripeEventHandlerService stripeEventHandlerService, IUserManagementService userManagementService,
            StripePaymentService stripePaymentService)
        {
            _jwtToken = jwtToken;
            _stripeEventHandlerService = stripeEventHandlerService;
            _userManagementService = userManagementService;
            _stripePaymentService = stripePaymentService;
        }

        [Authorize]
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequestDto req)
        {
            var user = await _userManagementService.GetAuth0UserAsync(_jwtToken.UserId);
            string stripeCustomerId;

            if (String.IsNullOrEmpty(user.AppMetadata?.StripeCustomerId))
            {
                var newCustomer = new CreateCustomerDto(_jwtToken.UserId, user.Name, user.Email);
                var customer = await _stripePaymentService.CreateCustomerAsync(newCustomer);
                stripeCustomerId = customer.Id;
            }
            else
            {
                var retrievedCustomer = await _stripePaymentService.GetCustomerAsync(user.AppMetadata.StripeCustomerId);
                if (retrievedCustomer.Subscription == null)
                {
                    stripeCustomerId = user.AppMetadata.StripeCustomerId;
                }
                else
                {
                    return BadRequest(new ErrorResponseDto
                    {
                        ErrorMessage = new ErrorMessageDto
                        {
                            Message = "This user already has a subscription.",
                        }
                    });
                }
            }

            try
            {
                CreateCheckoutSessionResponseDto checkoutSessionResponse =
                    await _stripePaymentService.CreateCheckoutSessionAsync(stripeCustomerId, _jwtToken.UserId,
                        req.PriceTier);
                return Ok(checkoutSessionResponse);
            }
            catch (StripeException e)
            {
                Console.WriteLine(e.StripeError.Message);
                return BadRequest(new ErrorResponseDto
                {
                    ErrorMessage = new ErrorMessageDto
                    {
                        Message = e.StripeError.Message,
                    }
                });
            }
        }

        [Authorize]
        [HttpGet("customer-portal")]
        public async Task<IActionResult> CustomerPortal()
        {
            var customerPortalSession = await _stripePaymentService.CreateBillingPortalSessionAsync(_jwtToken.UserId);
            if (customerPortalSession != null)
            {
                return Ok(customerPortalSession);
            }

            return BadRequest();
        }

        [HttpPost("stripe-webhook")]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent =
                _stripeEventHandlerService.GetValidatedEvent(json, Request.Headers["Stripe-Signature"]);

            if (stripeEvent == null)
            {
                return BadRequest();
            }

            switch (stripeEvent.Type)
            {
                case Events.CheckoutSessionCompleted:
                    var session = stripeEvent.Data.Object as Session;
                    await _stripeEventHandlerService.SessionCompletedAsync(session);
                    break;
                case Events.InvoicePaid:
                    var invoicePaid = stripeEvent.Data.Object as Invoice;
                    await _stripeEventHandlerService.InvoicePaidAsync(invoicePaid);
                    break;
                case Events.InvoicePaymentFailed:
                    var invoiceFailed = stripeEvent.Data.Object as Invoice;
                    await _stripeEventHandlerService.InvoiceFailedAsync(invoiceFailed);
                    break;
                case Events.CustomerSubscriptionDeleted:
                    var subscriptionDeleted = stripeEvent.Data.Object as Subscription;
                    await _stripeEventHandlerService.SubscriptionDeletedAsync(subscriptionDeleted);
                    break;
            }

            return Ok();
        }
    }
}