using Newtonsoft.Json;

namespace Functions.Model.DTOs
{
    public class Auth0Identities
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