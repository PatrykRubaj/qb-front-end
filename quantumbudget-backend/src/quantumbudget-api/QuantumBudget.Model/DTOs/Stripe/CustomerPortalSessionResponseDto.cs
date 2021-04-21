using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class CustomerPortalSessionResponseDto
    {
        [JsonProperty("url")]
        public string Url { get; set; }
    }
}