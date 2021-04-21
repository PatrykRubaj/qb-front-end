using System.Linq;
using FluentValidation;
using QuantumBudget.Model.DTOs.BudgetData;

namespace QuantumBudget.API.Validators
{
    public class BudgetDtoValidator : AbstractValidator<BudgetDto>
    {
        public BudgetDtoValidator()
        {
            RuleFor(x => x.Country).NotNull();
            
            RuleFor(x => x.Incomes).Must(x => x.Count > 0);
            RuleForEach(x => x.Incomes).SetValidator(new IncomeDtoValidator());
            
            RuleFor(x => x.Categories).Must(x => x.Count > 0);
            RuleForEach(x => x.Categories).SetValidator(new CategoryDtoValidator());
            
            RuleFor(x => x.Subcategories).Must(x => x.Count > 0).Must((budget, subcategories) =>
            {
                return subcategories.All(subcategory => budget.Categories.Any(x => x.Id == subcategory.CategoryId));
            });
            RuleForEach(x => x.Subcategories).SetValidator(new SubcategoryDtoValidator());
            RuleFor(x => x.User).NotNull().SetValidator(new UserDtoValidator());
            
            RuleFor(x => x.Month).NotEmpty();
        }
    }
}