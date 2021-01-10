using Newtonsoft.Json;

namespace Functions.Model.DTOs.GoogleSpreadsheet
{
    public class SpreadsheetProperties
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("locale")]
        public string Locale { get; set; }

    }
}