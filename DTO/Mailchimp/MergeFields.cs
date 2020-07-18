using Newtonsoft.Json;

namespace DTO.Mailchimp
{
    public class MergeFields
    {
        [JsonProperty("FNAME")]
        public string FirstName { get; set; }
    }
}