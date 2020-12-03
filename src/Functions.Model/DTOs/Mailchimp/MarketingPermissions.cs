using System.Collections.Generic;
using Newtonsoft.Json;

namespace Functions.Model.DTOs.Mailchimp
{
    public class MarketingPermissions
    {
        public MarketingPermissions(string id)
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