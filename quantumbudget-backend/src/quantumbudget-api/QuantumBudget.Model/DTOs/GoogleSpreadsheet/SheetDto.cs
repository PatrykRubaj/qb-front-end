using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.GoogleSpreadsheet
{
    public class SheetDto
    {
        [JsonProperty("properties")]
        public SheetPropertiesDto Properties { get; set; }

    }
}