using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Mailchimp
{
    public class MergeFieldsDto
    {
        [JsonProperty("FNAME")]
        public string FirstName { get; set; }
    }
}