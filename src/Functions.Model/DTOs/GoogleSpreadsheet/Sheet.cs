using Newtonsoft.Json;

namespace Functions.Model.DTOs.GoogleSpreadsheet
{
    public class Sheet
    {
        [JsonProperty("properties")]
        public SheetProperties Properties { get; set; }

    }
}