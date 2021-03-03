using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;

namespace QuantumBudget.Repositories.Stripe
{
    public interface IStripeCustomerRepository
    {
        Task<StripeCustomerDto> GetAsync(string customerId);
        Task<StripeCustomerDto> CreateAsync(CreateCustomerDto newCustomer);
    }
}