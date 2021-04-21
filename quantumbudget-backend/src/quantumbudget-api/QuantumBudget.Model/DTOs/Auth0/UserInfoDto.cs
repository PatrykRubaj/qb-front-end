using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class UserInfoDto
    {
        [JsonProperty("sub")]
        public string UserId { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("given_name")]
        public string GivenName { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}