using System;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class UpdateCustomerDto
    {
        public UpdateCustomerDto(string customerId, string country)
        {
            CustomerId = string.IsNullOrEmpty(customerId) ? throw new ArgumentNullException(customerId) : customerId;
            Country = string.IsNullOrEmpty(country) ? throw new ArgumentNullException(country) : country;
        }

        public string CustomerId { get; }
        public string Country { get; }
        public string City { get; set; }
        public string State { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string PostalCode { get; set; }
    }
}