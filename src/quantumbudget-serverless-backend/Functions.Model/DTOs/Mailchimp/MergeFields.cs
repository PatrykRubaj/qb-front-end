using Newtonsoft.Json;

namespace Functions.Model.DTOs.Mailchimp
{
    public class MergeFields
    {
        [JsonProperty("FNAME")]
        public string FirstName { get; set; }
    }
}