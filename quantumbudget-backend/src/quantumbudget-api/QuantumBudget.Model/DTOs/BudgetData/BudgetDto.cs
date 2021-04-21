using System;
using System.Collections.Generic;

namespace QuantumBudget.Model.DTOs.BudgetData
{
    public class BudgetDto
    {
        public CountryDto Country { get; set; }
        public IList<IncomeDto> Incomes { get; set; } = new List<IncomeDto>();
        public IList<CategoryDto> Categories { get; set; } = new List<CategoryDto>();
        public IList<SubcategoryDto> Subcategories { get; set; } = new List<SubcategoryDto>();
        public DateTime Month { get; set; }
        public UserDto User { get; set; }
    }
}