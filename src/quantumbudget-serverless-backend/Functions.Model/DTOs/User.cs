using Newtonsoft.Json;

namespace Functions.Model.DTOs
{
    public class User
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }
    }
}