using Newtonsoft.Json;

namespace Functions.Model.DTOs.Stripe
{
    public class CreateCheckoutSessionRequest
    {
        [JsonProperty("priceId")]
        public string PriceId { get; set; }
    }
}