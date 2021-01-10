using System;

namespace Functions.Model.DTOs.BudgetData
{
    public class Subcategory
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public decimal? Amount { get; set; }
        public EntityStatus Status { get; set; }
        public int RowIndex { get; set; }
    }
}