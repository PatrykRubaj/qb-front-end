using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Repositories.Stripe;

namespace QuantumBudget.Services.Tests.Repositories
{
    public class StripeCustomerRepositoryMock : IStripeCustomerRepository
    {
        private readonly List<StripeCustomerDto> _stripeCustomers;
        private int _idCounter = 0;

        public StripeCustomerRepositoryMock()
        {
            _stripeCustomers = new List<StripeCustomerDto>()
            {
                new()
                {
                    Id = "cus_id1",
                    Auth0Id = "google2|id1",
                    Subscription = new StripeSubscriptionDto()
                    {
                        Id = "sub_1",
                        Status = "active",
                        CustomerId = "cus_id1"
                    }
                },
                new()
                {
                    Id = "cus_id2",
                    Auth0Id = "google2|id2",
                    Subscription = null
                },
                new()
                {
                    Id = "cus_id3",
                    Auth0Id = "google2|id3",
                    Subscription = new StripeSubscriptionDto()
                    {
                        Id = "sub_1",
                        Status = "active",
                        CustomerId = "cus_id1"
                    }
                },
            };

            _idCounter = _stripeCustomers.Count;
        }

        public async Task<StripeCustomerDto> GetAsync(string customerId)
        {
            return _stripeCustomers.FirstOrDefault(x => x.Id == customerId);
        }

        public async Task<StripeCustomerDto> CreateAsync(CreateCustomerDto newCustomer)
        {
            _idCounter++;
            _stripeCustomers.Add(new StripeCustomerDto()
            {
                Id = $"cus_id{_idCounter}",
                Auth0Id = newCustomer.Metadata["auth0UserId"],
            });

            return _stripeCustomers.First(x => x.Id == $"cus_id{_idCounter}");
        }
    }
}