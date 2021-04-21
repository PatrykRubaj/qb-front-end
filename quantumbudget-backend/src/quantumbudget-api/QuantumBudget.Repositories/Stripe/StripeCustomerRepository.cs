using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using Stripe;

namespace QuantumBudget.Repositories.Stripe
{
    public class StripeCustomerRepository : IStripeCustomerRepository
    {
        private readonly CustomerService _customerService;

        public StripeCustomerRepository(CustomerService customerService)
        {
            _customerService = customerService;
        }

        public async Task<Customer> GetAsync(string customerId)
        {
            Customer customer = await _customerService.GetAsync(customerId, new CustomerGetOptions()
            {
                Expand = new List<string>()
                {
                    "subscriptions"
                }
            });

            return customer;
        }

        public async Task<Customer> CreateAsync(CustomerCreateOptions newCustomer)
        {
            var customerCreateOptions = new CustomerCreateOptions
            {
                Email = newCustomer.Email,
                Name = newCustomer.Name,
                Metadata = newCustomer.Metadata,
            };

            return await _customerService.CreateAsync(newCustomer);
        }

        public async Task<Customer> UpdateAsync(string customerId, CustomerUpdateOptions updatedCustomer)
        {
            var customerUpdateOptions = new CustomerUpdateOptions()
            {
                Address = new AddressOptions()
                {
                    Country = updatedCustomer.Address.Country,
                    City = updatedCustomer.Address.City,
                    PostalCode = updatedCustomer.Address.PostalCode,
                    Line1 = updatedCustomer.Address.Line1,
                    Line2 = updatedCustomer.Address.Line2,
                    State = updatedCustomer.Address.State,
                    
                },
            };

            return await _customerService.UpdateAsync(customerId, customerUpdateOptions);
        }
    }
}