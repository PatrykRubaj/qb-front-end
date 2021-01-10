using Newtonsoft.Json;

namespace Functions.Model.DTOs.Stripe
{
    public class ErrorMessage
    {
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}