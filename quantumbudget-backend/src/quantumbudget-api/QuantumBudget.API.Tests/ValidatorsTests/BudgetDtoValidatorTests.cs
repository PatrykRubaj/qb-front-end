using FluentValidation;
using FluentValidation.TestHelper;
using QuantumBudget.API.Validators;
using QuantumBudget.Model.DTOs.BudgetData;
using Xunit;

namespace QuantumBudget.API.Tests.ValidatorsTests
{
    public class BudgetDtoValidatorTests
    {
        [Fact]
        public void FailValidation_When_DateIsEmpty()
        {
            var budget = new BudgetDto();
            var validator = new BudgetDtoValidator();
            
            var result = validator.TestValidate(budget);

            result.ShouldHaveValidationErrorFor(x => x.Month);
        }
    }
}