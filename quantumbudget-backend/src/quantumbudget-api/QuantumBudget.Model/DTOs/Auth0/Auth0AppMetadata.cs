using System;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class Auth0AppMetadata
    {
        [JsonProperty("subscriptionPlan")]
        public string SubscriptionPlan { get; set; }
        
        [JsonProperty("subscriptionExpires")]
        public DateTimeOffset SubscriptionExpires { get; set; }
        
        [JsonProperty("stripeSessionId")]
        public string StripeSessionId { get; set; }
        
        [JsonProperty("stripeCustomerId")]
        public string StripeCustomerId { get; set; }
    }
}