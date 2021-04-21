using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class ErrorResponseDto
    {
        [JsonProperty("error")]
        public ErrorMessageDto ErrorMessage { get; set; }
    }
}