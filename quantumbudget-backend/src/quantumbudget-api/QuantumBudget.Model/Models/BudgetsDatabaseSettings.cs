namespace QuantumBudget.Model.Models
{
    public class BudgetsDatabaseSettings : IBudgetsDatabaseSettings
    {
        public string BudgetsCollectionName { get; set; }
        public string MongoDBConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IBudgetsDatabaseSettings
    {
        string BudgetsCollectionName { get; set; }
        string MongoDBConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}