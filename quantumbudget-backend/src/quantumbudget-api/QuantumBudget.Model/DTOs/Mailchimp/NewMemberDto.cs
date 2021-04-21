using System.Collections.Generic;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Mailchimp
{
    public class NewMemberDto
    {
        [JsonProperty("email_address")]
        public string EmailAddress { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("tags")]
        public IList<string> Tags { get; set; } = new List<string>();

        [JsonProperty("merge_fields")]
        public MergeFieldsDto MergeFields { get; set; }

        [JsonProperty("marketing_permissions")]
        public IList<MarketingPermissionsDto> MarketingPresmissions { get; set; } = new List<MarketingPermissionsDto>();

    }
}