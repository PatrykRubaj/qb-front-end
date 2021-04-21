using System;

namespace QuantumBudget.Model.DTOs.BudgetData
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public EntityStatus Status { get; set; }
        public int RowIndex { get; set; }
    }
}