using System.Threading.Tasks;
using Stripe;

namespace QuantumBudget.Services
{
    public interface IStripeCustomerService
    {
        Task<Customer> GetAsync(string customerId);
        Task<Customer> CreateAsync(CustomerCreateOptions newCustomer);
    }
}