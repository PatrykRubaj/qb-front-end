using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class Auth0IdentitiesDto
    {
        [JsonProperty("provider")]
        public string Provider { get; set; }

        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }

        [JsonProperty("user_id")]
        public string UserId { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
    }
}