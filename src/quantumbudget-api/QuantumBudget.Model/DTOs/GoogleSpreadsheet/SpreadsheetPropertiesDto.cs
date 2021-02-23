using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.GoogleSpreadsheet
{
    public class SpreadsheetPropertiesDto
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("locale")]
        public string Locale { get; set; }

    }
}