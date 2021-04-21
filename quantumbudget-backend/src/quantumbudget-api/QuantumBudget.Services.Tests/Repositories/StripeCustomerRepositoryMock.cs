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
                    },
                    Address = new Address()
                    {
                        City = "Lodz",
                        Country = "PL",
                        PostalCode = "90-608",
                        Line1 = "Piotrkowska 60/25",
                        State = "lodzkie",
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

        public async Task<Customer> UpdateAsync(string customerId, CustomerUpdateOptions updatedCustomer)
        {
            var customer = _stripeCustomers.FirstOrDefault(x => x.Id == customerId);

            if (customer == null) return null;

            customer.Address ??= new Address();
            customer.Address.City = updatedCustomer.Address.City ?? customer.Address.City;
            customer.Address.Country = updatedCustomer.Address.Country ?? customer.Address.Country;
            customer.Address.Line1 = updatedCustomer.Address.Line1 ?? customer.Address.Line1;
            customer.Address.Line2 = updatedCustomer.Address.Line2 ?? customer.Address.Line2;
            customer.Address.State = updatedCustomer.Address.State ?? customer.Address.State;
            customer.Address.PostalCode = updatedCustomer.Address.PostalCode ?? customer.Address.PostalCode;

            return customer;
        }
    }
}