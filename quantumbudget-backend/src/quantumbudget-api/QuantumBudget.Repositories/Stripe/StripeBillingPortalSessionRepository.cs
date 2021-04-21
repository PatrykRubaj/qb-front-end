using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Model.Options;
using Stripe.BillingPortal;

namespace QuantumBudget.Repositories.Stripe
{
    public class StripeBillingPortalSessionRepository : IStripeBillingPortalSessionRepository
    {
        private readonly SessionService _sessionService;
        private readonly StripeOptions _stripeOptions;

        public StripeBillingPortalSessionRepository(SessionService sessionService, IOptions<StripeOptions> stripeOptions)
        {
            _sessionService = sessionService;
            _stripeOptions = stripeOptions.Value;
        }

        public async Task<CustomerPortalSessionResponseDto> CreateAsync(string stripeCustomerId)
        {
            var options = new SessionCreateOptions
            {
                Customer = stripeCustomerId,
                ReturnUrl = $"{_stripeOptions.Domain}/login",
            };

            var session = await _sessionService.CreateAsync(options);

            return new CustomerPortalSessionResponseDto()
            {
                Url = session.Url,
            };
        }
    }
}