using FluentValidation;
using QuantumBudget.Model.DTOs.BudgetData;

namespace QuantumBudget.API.Validators
{
    public class SubcategoryDtoValidator : AbstractValidator<SubcategoryDto>
    {
        public SubcategoryDtoValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.CategoryId).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Status).Must(x => x == EntityStatus.Saved);
        }
    }
}