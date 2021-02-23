using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Stripe
{
    public class CreateCheckoutSessionRequestDto
    {
        [JsonProperty("priceId")]
        public string PriceId
        {
            get {
                switch (PriceTier)
                {
                    case "basic": return "price_1I6b3ZARU7b93yerMHYunXhA";
                    case "premium": return "price_1I6b6FARU7b93yerxUuBGzaU";
                    case "pro": return "price_1I6b6RARU7b93yerr2W0fY1I";
                    default: return "price_1I6b3ZARU7b93yerMHYunXhA";
                }
            }
        }

        [JsonProperty("priceTier")]
        public string PriceTier { get; set; }
    }
}