using System.Collections.Generic;
using Newtonsoft.Json;

namespace DTO.Mailchimp
{
    public class Member
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("email_address")]
        public string EmailAddress { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("tags")]
        public IList<Tag> Tags { get; set; } = new List<Tag>();

    }
}