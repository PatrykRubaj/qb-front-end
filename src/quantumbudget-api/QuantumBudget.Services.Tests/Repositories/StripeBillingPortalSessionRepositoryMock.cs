using System.Collections.Generic;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Repositories.Stripe;

namespace QuantumBudget.Services.Tests.Repositories
{
    public class StripeBillingPortalSessionRepositoryMock : IStripeBillingPortalSessionRepository
    {
        public List<CustomerPortalSessionResponseDto> CustomerPortalSessionResponses { get; }

        public StripeBillingPortalSessionRepositoryMock()
        {
            CustomerPortalSessionResponses = new List<CustomerPortalSessionResponseDto>();
        }
        
        public async Task<CustomerPortalSessionResponseDto> CreateAsync(string stripeCustomerId)
        {
            var checkoutSessionResponseDto = new CustomerPortalSessionResponseDto()
            {
                Url = $"https://stripe.com/?customerId={stripeCustomerId}",
            };

            CustomerPortalSessionResponses.Add(checkoutSessionResponseDto);

            return checkoutSessionResponseDto;
        }
    }
}