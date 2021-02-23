using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class UserAppMetadataWriteCustomerIdDto
    {
        [JsonProperty("stripeCustomerId")]
        public string StripeCustomerId { get; set; }
    }
}