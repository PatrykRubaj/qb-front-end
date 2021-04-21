using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class UserDto
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }
    }
}