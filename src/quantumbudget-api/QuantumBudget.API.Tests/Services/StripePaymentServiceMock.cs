using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Services;

namespace QuantumBudget.API.Tests.Services
{
    public class StripePaymentServiceMock : IStripePaymentService
    {
        public async Task<StripeCustomerDto> GetCustomerAsync(string customerId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<StripeCustomerDto> CreateCustomerAsync(CreateCustomerDto newCustomer)
        {
            throw new System.NotImplementedException();
        }

        public async Task<CreateCheckoutSessionResponseDto> CreateCheckoutSessionAsync(string stripeCustomerId, string auth0UserId, string priceTier)
        {
            throw new System.NotImplementedException();
        }

        public async Task<CustomerPortalSessionResponseDto> CreateBillingPortalSessionAsync(string userId)
        {
            throw new System.NotImplementedException();
        }
    }
}