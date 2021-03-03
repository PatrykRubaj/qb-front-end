namespace QuantumBudget.Model.Mappers
{
    public interface IPriceNameToIdMapper
    {
        string Map(string priceName);
        string TaxId { get; }
    }
}