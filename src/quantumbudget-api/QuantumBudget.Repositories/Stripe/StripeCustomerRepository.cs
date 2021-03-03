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

        public async Task<StripeCustomerDto> GetAsync(string customerId)
        {
            Customer customer = await _customerService.GetAsync(customerId, new CustomerGetOptions()
            {
                Expand = new List<string>()
                {
                    "subscriptions"
                }
            });

            var stripeSubscription = new StripeSubscriptionDto()
            {
                Id = customer.Subscriptions?.FirstOrDefault()?.Id,
                CustomerId = customer.Subscriptions?.FirstOrDefault()?.CustomerId,
                Status = customer.Subscriptions?.FirstOrDefault()?.Status,
            };
            
            var stripeCustomer = new StripeCustomerDto()
            {
                Id = customer.Id,
                Auth0Id = customer.Metadata?.GetValueOrDefault("auth0UserId"),
                Subscription = stripeSubscription,
            };
            
            return stripeCustomer;
        }

        public async Task<StripeCustomerDto> CreateAsync(CreateCustomerDto newCustomer)
        {
            var customerCreateOptions = new CustomerCreateOptions
            {
                Email = newCustomer.Email,
                Name = newCustomer.Name,
                Metadata = newCustomer.Metadata,
            };

            var customer = await _customerService.CreateAsync(customerCreateOptions);

            return new StripeCustomerDto()
            {
                Id = customer.Id,
                Auth0Id = customer.Metadata?.GetValueOrDefault("auth0UserId"),
            };
        }
    }
}