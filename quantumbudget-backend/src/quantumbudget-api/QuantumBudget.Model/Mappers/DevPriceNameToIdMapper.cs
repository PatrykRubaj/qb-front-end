namespace QuantumBudget.Model.Mappers
{
    public class DevPriceNameToIdMapper: IPriceNameToIdMapper
    {
        public string TaxId { get; } = "txr_1I6b7AARU7b93yergkrxpvQF";
        
        public string Map(string priceName)
        {
            switch (priceName)
            {
                case "basic": return "price_1I6b3ZARU7b93yerMHYunXhA";
                case "pro": return "price_1I6b6RARU7b93yerr2W0fY1I";
                default: return "price_1I6b3ZARU7b93yerMHYunXhA";
            }
        }
    }
}