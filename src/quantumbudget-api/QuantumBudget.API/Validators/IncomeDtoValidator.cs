using FluentValidation;
using QuantumBudget.Model.DTOs.BudgetData;

namespace QuantumBudget.API.Validators
{
    public class IncomeDtoValidator: AbstractValidator<IncomeDto>
    {
        public IncomeDtoValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Amount).NotNull();
            RuleFor(x => x.Status).Must(x => x == EntityStatus.Saved);
        }
    }
}