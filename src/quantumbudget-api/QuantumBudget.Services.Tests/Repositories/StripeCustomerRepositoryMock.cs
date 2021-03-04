using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Repositories.Stripe;
using Stripe;

namespace QuantumBudget.Services.Tests.Repositories
{
    public class StripeCustomerRepositoryMock : IStripeCustomerRepository
    {
        private readonly List<Customer> _stripeCustomers;
        private int _idCounter = 0;

        public StripeCustomerRepositoryMock()
        {
            _stripeCustomers = new List<Customer>()
            {
                new()
                {
                    Id = "cus_id1",
                    Metadata = new Dictionary<string, string>()
                    {
                        {"Auth0Id", "google2|id1"}
                    },
                    Subscriptions = new StripeList<Subscription>()
                    {
                        Data = new List<Subscription>()
                        {
                            new Subscription()
                            {
                                Id = "sub_1",
                                Status = "active",
                                CustomerId = "cus_id1"
                            }
                        }
                    },
                },
                new()
                {
                    Id = "cus_id2",
                    Metadata = new Dictionary<string, string>()
                    {
                        {"Auth0Id", "google2|id2"}
                    },
                    Subscriptions = null
                },
                new()
                {
                    Id = "cus_id3",
                    Metadata = new Dictionary<string, string>()
                    {
                        {"Auth0Id", "google2|id3"}
                    },
                    Subscriptions = new StripeList<Subscription>()
                    {
                        Data = new List<Subscription>()
                        {
                            new Subscription()
                            {
                                Id = "sub_3",
                                Status = "active",
                                CustomerId = "cus_id3"
                            }
                        }
                    }
                },
            };

            _idCounter = _stripeCustomers.Count;
        }

        public async Task<Customer> GetAsync(string customerId)
        {
            return _stripeCustomers.FirstOrDefault(x => x.Id == customerId);
        }

        public async Task<Customer> CreateAsync(CustomerCreateOptions newCustomer)
        {
            _idCounter++;
            _stripeCustomers.Add(new Customer()
            {
                Id = $"cus_id{_idCounter}",
                Metadata = newCustomer.Metadata,
            });

            return _stripeCustomers.First(x => x.Id == $"cus_id{_idCounter}");
        }
    }
}