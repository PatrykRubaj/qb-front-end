using Newtonsoft.Json;

namespace DTO.GoogleSpreadsheet
{
    public class SpreadsheetProperties
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("locale")]
        public string Locale { get; set; }

    }
}