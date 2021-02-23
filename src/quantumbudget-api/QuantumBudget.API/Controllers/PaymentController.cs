using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Model.Options;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Model.Models;
using QuantumBudget.Services;

namespace QuantumBudget.API.Controllers
{
    public class PaymentsController : Controller
    {
        private readonly JwtToken _jwtToken;
        private readonly StripeEventHandlerService _stripeEventHandlerService;
        private readonly IUserManagementService _userManagementService;
        private readonly StripeOptions _options;
        private readonly IStripeClient _client;
        private readonly StripePaymentService _stripePaymentService;

        public PaymentsController(IOptions<StripeOptions> options, JwtToken jwtToken,
            StripeEventHandlerService stripeEventHandlerService, IUserManagementService userManagementService,
            IStripeClient client, StripePaymentService stripePaymentService)
        {
            _jwtToken = jwtToken;
            _stripeEventHandlerService = stripeEventHandlerService;
            _userManagementService = userManagementService;
            _options = options.Value;
            _client = client;
            _stripePaymentService = stripePaymentService;
        }

        //[HttpGet("setup")]
        //public SetupResponse Setup()
        //{
        //    return new SetupResponse
        //    {
        //        ProPrice = this.options.Value.ProPrice,
        //        BasicPrice = this.options.Value.BasicPrice,
        //        PublishableKey = this.options.Value.PublishableKey,
        //    };
        //}

        [Authorize]
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequestDto req)
        {
            var user = await _userManagementService.GetAuth0User(_jwtToken.UserId);

            //Create new stripe Customer
            Customer customer;
            if (String.IsNullOrEmpty(user.AppMetadata?.StripeCustomerId))
            {
                var newCustomer = new CreateCustomerDto(_jwtToken.UserId, user.Name, user.Email);
                var customerCreateOptions = new CustomerCreateOptions
                {
                    Email = newCustomer.Email,
                    Name = newCustomer.Name,
                    Metadata = newCustomer.Metadata,
                };

                var customerService = new CustomerService(_client);
                customer = await customerService.CreateAsync(customerCreateOptions);

                //Update app_metadata for the user with Stripe Customer ID
                await _userManagementService.UpdateAppMetadata(_jwtToken.UserId, new UserAppMetadataWriteCustomerIdDto()
                {
                    StripeCustomerId = customer.Id
                });
            }
            else
            {
                var retrievedCustomer = await _stripePaymentService.GetCustomer(user.AppMetadata.StripeCustomerId);
                if (retrievedCustomer.Subscriptions.Data.Count == 0)
                {
                    customer = new Customer()
                    {
                        Id = user.AppMetadata.StripeCustomerId,
                    };
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

            var options = new SessionCreateOptions
            {
                Customer = customer.Id,
                ClientReferenceId = _jwtToken.UserId,
                SuccessUrl = $"{_options.Domain}/payment-successful?sessionId={{CHECKOUT_SESSION_ID}}",
                CancelUrl = $"{_options.Domain}/payment-canceled",
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                Mode = "subscription",
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = req.PriceId,
                        Quantity = 1,
                    },
                },
                SubscriptionData = new SessionSubscriptionDataOptions()
                {
                    TrialPeriodDays = 7,
                    DefaultTaxRates = new List<string>
                    {
                        "txr_1I6b7AARU7b93yergkrxpvQF",
                    },
                }
            };

            var service = new SessionService(_client);
            try
            {
                var session = await service.CreateAsync(options);
                return Ok(new CreateCheckoutSessionResponseDto
                {
                    SessionId = session.Id,
                });
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

        [HttpGet("customer-portal")]
        public async Task<IActionResult> CustomerPortal()
        {
            var user = await _userManagementService.GetAuth0User(_jwtToken.UserId);

            if (!String.IsNullOrEmpty(user?.AppMetadata?.StripeCustomerId))
            {
                var options = new Stripe.BillingPortal.SessionCreateOptions
                {
                    Customer = user.AppMetadata.StripeCustomerId,
                    ReturnUrl = $"{_options.Domain}/",
                };

                var service = new Stripe.BillingPortal.SessionService(_client);
                var session = await service.CreateAsync(options);

                return Ok(session);
            }

            return BadRequest();
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent;
            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    _options.WebhookSecret
                );
                Console.WriteLine($"Webhook notification with type: {stripeEvent.Type} found for {stripeEvent.Id}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Something failed {e}");
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
                    await _stripeEventHandlerService.InvoicePaid(invoicePaid);
                    break;
                case Events.InvoicePaymentFailed:
                    var invoiceFailed = stripeEvent.Data.Object as Invoice;
                    await _stripeEventHandlerService.InvoiceFailed(invoiceFailed);
                    break;
                case Events.CustomerSubscriptionDeleted:
                    var subscriptionDeleted = stripeEvent.Data.Object as Subscription;
                    await _stripeEventHandlerService.SubscriptionDeleted(subscriptionDeleted);
                    break;
            }

            return Ok();
        }

        [HttpGet("payment/test/{userId}")]
        public async Task<IActionResult> Test(string userId)
        {
            await _userManagementService.AssignRole(userId, new Auth0Role("Basic"));

            return Ok();
        }
    }
}