using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Model.Options;
using Stripe;
using Stripe.Checkout;

namespace QuantumBudget.Repositories.Stripe
{
    public class StripeCheckoutSessionRepository : IStripeCheckoutSessionRepository
    {
        private readonly SessionService _sessionService;
        private readonly StripeOptions _stripeOptions;

        public StripeCheckoutSessionRepository(SessionService sessionService, IOptions<StripeOptions> stripeOptions)
        {
            _sessionService = sessionService;
            _stripeOptions = stripeOptions.Value;
        }

        public async Task<CreateCheckoutSessionResponseDto> CreateAsync(string stripeCustomerId, string auth0UserId, string priceId, string taxId)
        {
            var options = new SessionCreateOptions
            {
                Customer = stripeCustomerId,
                ClientReferenceId = auth0UserId,
                BillingAddressCollection = "required",
                SuccessUrl = $"{_stripeOptions.Domain}/payment-successful?sessionId={{CHECKOUT_SESSION_ID}}",
                CancelUrl = $"{_stripeOptions.Domain}/payment-canceled",
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                Mode = "subscription",
                LineItems = new List<SessionLineItemOptions>
                {
                    new()
                    {
                        Price = priceId,
                        Quantity = 1,
                    },
                },
                SubscriptionData = new SessionSubscriptionDataOptions()
                {
                    TrialPeriodDays = 7,
                    DefaultTaxRates = new List<string>
                    {
                        taxId,
                    },
                }
            };
            
            var session = await _sessionService.CreateAsync(options);

            return new CreateCheckoutSessionResponseDto()
            {
                SessionId = session.Id,
            };
        }
    }
}