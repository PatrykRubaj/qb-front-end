using System;

namespace DTO.BudgetData
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public EntityStatus Status { get; set; }
    }
}