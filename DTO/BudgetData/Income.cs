using System;

namespace DTO.BudgetData
{
    public class Income
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal? Amount { get; set; }
        public EntityStatus Status { get; set; }
    }
}