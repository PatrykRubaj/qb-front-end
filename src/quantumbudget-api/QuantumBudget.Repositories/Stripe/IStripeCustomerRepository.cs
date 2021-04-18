using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using Stripe;

namespace QuantumBudget.Repositories.Stripe
{
    public interface IStripeCustomerRepository
    {
        Task<Customer> GetAsync(string customerId);
        Task<Customer> CreateAsync(CustomerCreateOptions newCustomer);
        Task<Customer> UpdateAsync(string customerId, CustomerUpdateOptions updatedCustomer);
    }
}