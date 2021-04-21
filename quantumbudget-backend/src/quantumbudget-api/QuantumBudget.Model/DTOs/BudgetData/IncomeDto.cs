using System;

namespace QuantumBudget.Model.DTOs.BudgetData
{
    public class IncomeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal? Amount { get; set; }
        public EntityStatus Status { get; set; }
    }
}