using Google.Apis.Sheets.v4.Data;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.GoogleSpreadsheet
{
    public class SheetPropertiesDto
    {
        [JsonProperty("sheetId")]
        public int Id { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("index")]
        public int Index { get; set; }

        [JsonProperty("sheetType")]
        public string SheetType { get; set; } = "GRID";

        [JsonProperty("gridProperties")]
        public GridProperties GridProperties { get; set; }

        [JsonProperty("tabColor")]
        public object TabColor { get; set; }


    }
}