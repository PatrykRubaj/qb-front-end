using System.Collections.Generic;
using Newtonsoft.Json;

namespace Functions.Model.DTOs.Mailchimp
{
    public class NewMember
    {
        [JsonProperty("email_address")]
        public string EmailAddress { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("tags")]
        public IList<string> Tags { get; set; } = new List<string>();

        [JsonProperty("merge_fields")]
        public MergeFields MergeFields { get; set; }

        [JsonProperty("marketing_permissions")]
        public IList<MarketingPermissions> MarketingPresmissions { get; set; } = new List<MarketingPermissions>();

    }
}