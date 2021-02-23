using System.Collections.Generic;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Mailchimp
{
    public class MemberDto
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("email_address")]
        public string EmailAddress { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("tags")]
        public IList<TagDto> Tags { get; set; } = new List<TagDto>();

    }
}