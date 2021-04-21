using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class CreateCustomerDto
    {
        public CreateCustomerDto(string auth0UserId, string name, string email)
        {
            if (String.IsNullOrEmpty(auth0UserId))
            {
                throw new ArgumentNullException(nameof(auth0UserId));
            }
            
            Metadata = new Dictionary<string, string>()
            {
                {"auth0UserId", auth0UserId}
            };

            Name = name;
            Email = email;
        }
        
        [JsonProperty("email")]
        public string Email { get; }
        
        [JsonProperty("name")]
        public string Name { get; }
        
        [JsonProperty("metadata")]
        public Dictionary<string,string> Metadata { get; }
    }
}