using Newtonsoft.Json;

namespace DTO
{
    public class User
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }
    }
}