using System.Collections.Generic;
using System.Threading.Tasks;
using Stripe;

namespace QuantumBudget.Services
{
    public class StripePaymentService
    {
        private readonly CustomerService _customerService;
        private readonly IStripeClient _stripeClient;

        public StripePaymentService(CustomerService customerService, IStripeClient stripeClient)
        {
            _customerService = customerService;
            _stripeClient = stripeClient;
        }
        
        public async Task<Customer> GetCustomer(string customerId)
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
    }
}