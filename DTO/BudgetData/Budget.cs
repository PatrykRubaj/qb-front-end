using System;
using System.Collections.Generic;

namespace DTO.BudgetData
{
    public class Budget
    {
        public Country Country { get; set; }
        public IList<Income> Incomes { get; set; } = new List<Income>();
        public IList<Category> Categories { get; set; } = new List<Category>();
        public IList<Subcategory> Subcategories { get; set; } = new List<Subcategory>();
        public DateTime Month { get; set; }
    }
}