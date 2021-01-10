using Newtonsoft.Json;

namespace Functions.Model.DTOs.Stripe
{
    public class ErrorResponse
    {
        [JsonProperty("error")]
        public ErrorMessage ErrorMessage { get; set; }
    }
}