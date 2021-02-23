using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class CreateCheckoutSessionResponseDto
    {
        [JsonProperty("sessionId")]
        public string SessionId { get; set; }
    }
}