using FluentValidation;
using QuantumBudget.Model.DTOs.BudgetData;

namespace QuantumBudget.API.Validators
{
    public class UserDtoValidator : AbstractValidator<UserDto>
    {
        public UserDtoValidator()
        {
            RuleFor(x => x.AgreedToPrivacyPolicy).Must(x=> x.Equals(true));
            RuleFor(x => x.AgreedToTermsOfService).Must(x=> x.Equals(true));
        }
    }
}