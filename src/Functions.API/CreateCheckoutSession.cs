using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Functions.Model.DTOs.Stripe;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;

namespace Functions.API
{
    public class CreateCheckoutSession
    {
        private readonly StripeOptions _stripeOptions;
        private readonly IStripeClient _client;

        public CreateCheckoutSession(StripeOptions stripeOptions)
        {
            _stripeOptions = stripeOptions;
            _client = new StripeClient(_stripeOptions.SecretKey);
        }
        
        [FunctionName("CreateCheckoutSession")]
        public async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)]
            [FromBody] CreateCheckoutSessionRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            
            var options = new SessionCreateOptions
            {
                // See https://stripe.com/docs/api/checkout/sessions/create
                // for additional parameters to pass.
                // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
                // the actual Session ID is returned in the query parameter when your customer
                // is redirected to the success page.
                SuccessUrl = $"http://{_stripeOptions.Domain}/success.html?session_id={{CHECKOUT_SESSION_ID}}",
                CancelUrl = $"http://{_stripeOptions.Domain}/canceled.html",
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
                        // For metered billing, do not pass quantity
                        Quantity = 1,
                    },
                },
            };
            var service = new SessionService(_client);
            try
            {
                var session = await service.CreateAsync(options);
                return new OkObjectResult(new CreateCheckoutSessionResponse
                {
                    SessionId = session.Id,
                });
            }
            catch (StripeException e)
            {
                Console.WriteLine(e.StripeError.Message);
                return new ObjectResult(new ErrorResponse
                {
                    ErrorMessage = new ErrorMessage
                    {
                        Message = e.StripeError.Message,
                    }
                })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
    }
}