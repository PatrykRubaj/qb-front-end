using System.Collections.Generic;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Mailchimp
{
    public class MarketingPermissionsDto
    {
        public MarketingPermissionsDto(string id)
        {
            Id = id;
            Enabled = true;
        }

        [JsonProperty("marketing_permission_id")]
        public string Id { get; set; }

        [JsonProperty("enabled")]
        public bool Enabled { get; set; }
    }
}