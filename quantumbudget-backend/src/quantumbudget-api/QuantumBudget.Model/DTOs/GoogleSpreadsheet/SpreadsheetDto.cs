using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.GoogleSpreadsheet
{
    public class Spreadsheet
    {
        [JsonProperty("properties")]
        public Google.Apis.Sheets.v4.Data.SpreadsheetProperties Properties { get; set; }

        [JsonProperty("sheets")]
        public Google.Apis.Sheets.v4.Data.Sheet[] Sheets { get; set; }
    }
}