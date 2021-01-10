using Newtonsoft.Json;

namespace Functions.Model.DTOs.Stripe
{
    public class CreateCheckoutSessionResponse
    {
        [JsonProperty("sessionId")]
        public string SessionId { get; set; }
    }
}