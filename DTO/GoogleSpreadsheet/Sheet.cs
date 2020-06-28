using Newtonsoft.Json;

namespace DTO.GoogleSpreadsheet
{
    public class Sheet
    {
        [JsonProperty("properties")]
        public SheetProperties Properties { get; set; }

    }
}