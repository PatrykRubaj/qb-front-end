using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class CreateCheckoutSessionRequestDto
    {
        [JsonProperty("priceTier")]
        public string PriceTier { get; set; }
    }
}