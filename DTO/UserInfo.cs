using Newtonsoft.Json;

namespace DTO
{
    public class UserInfo
    {
        [JsonProperty("sub")]
        public string UserId { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
    }
}