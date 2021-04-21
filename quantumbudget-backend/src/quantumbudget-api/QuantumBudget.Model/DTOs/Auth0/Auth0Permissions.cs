namespace QuantumBudget.Model.DTOs.Auth0
{
    public static class Auth0Permissions
    {
        public static string BudgetRead { get; } = "budget:read";
        public static string BudgetWrite { get; } = "budget:write";
        public static string BudgetGenerate { get; } = "budget:generate";
    }
}