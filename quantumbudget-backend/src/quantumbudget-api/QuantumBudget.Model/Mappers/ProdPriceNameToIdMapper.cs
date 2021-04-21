namespace QuantumBudget.Model.Mappers
{
    public class ProdPriceNameToIdMapper: IPriceNameToIdMapper
    {
        public string TaxId { get; } = "txr_1IOdt1ARU7b93yerzbhZCPbU";
        
        public string Map(string priceName)
        {
            switch (priceName)
            {
                case "basic": return "price_1IOdMtARU7b93yerilhlptav";
                case "pro": return "price_1IOdNHARU7b93yeruFNsQR2q";
                default: return "price_1IOdMtARU7b93yerilhlptav";
            }
        }
    }
}