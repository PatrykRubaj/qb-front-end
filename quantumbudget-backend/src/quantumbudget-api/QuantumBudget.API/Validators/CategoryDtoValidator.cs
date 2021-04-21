using FluentValidation;
using QuantumBudget.Model.DTOs.BudgetData;

namespace QuantumBudget.API.Validators
{
    public class CategoryDtoValidator : AbstractValidator<CategoryDto>
    {
        public CategoryDtoValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Status).Must(x => x == EntityStatus.Saved);
        }
    }
}