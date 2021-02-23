using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class ErrorMessageDto
    {
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}