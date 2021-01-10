using System.Collections.Generic;
using Newtonsoft.Json;

namespace Functions.Model.DTOs
{
    public class Auth0User
    {
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("user_id")]
        public string UserId { get; set; }
        
        [JsonProperty("given_name")] 
        public string GivenName { get; set; }

        [JsonProperty("identities")]
        public IList<Auth0Identities> Identities { get; set; } = new List<Auth0Identities>();
    }
}