using System.Collections.Generic;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class Auth0UserDto
    {
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("user_id")]
        public string UserId { get; set; }
        
        [JsonProperty("given_name")] 
        public string GivenName { get; set; }
        
        [JsonProperty("name")] 
        public string Name { get; set; }

        [JsonProperty("identities")]
        public IList<Auth0IdentitiesDto> Identities { get; set; } = new List<Auth0IdentitiesDto>();

        [JsonProperty("app_metadata")]
        public Auth0AppMetadata AppMetadata { get; set; }
    }
}