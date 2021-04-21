using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;

namespace QuantumBudget.Services
{
    public interface IStripePaymentService
    {
        Task<StripeCustomerDto> GetCustomerAsync(string customerId);
        Task<StripeCustomerDto> CreateCustomerAsync(CreateCustomerDto newCustomer);

        Task<CreateCheckoutSessionResponseDto> CreateCheckoutSessionAsync(string stripeCustomerId,
            string auth0UserId, string priceTier);

        Task<CustomerPortalSessionResponseDto> CreateBillingPortalSessionAsync(string userId);
        
        Task<UpdateCustomerDto> UpdateCustomerAsync(UpdateCustomerDto updatedCustomer);
    }
}