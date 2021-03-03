using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Repositories.Stripe;

namespace QuantumBudget.Services.Tests.Repositories
{
    public class StripeCheckoutSessionRepositoryMock : IStripeCheckoutSessionRepository
    {
        public List<CreateCheckoutSessionResponseDto> CheckoutSessionResponses { get; }

        public StripeCheckoutSessionRepositoryMock()
        {
            CheckoutSessionResponses = new List<CreateCheckoutSessionResponseDto>();
        }

        public async Task<CreateCheckoutSessionResponseDto> CreateAsync(string stripeCustomerId, string auth0UserId,
            string priceId, string taxId)
        {
            var checkoutSessionResponseDto = new CreateCheckoutSessionResponseDto()
            {
                SessionId = Guid.NewGuid().ToString(),
            };

            CheckoutSessionResponses.Add(checkoutSessionResponseDto);

            return checkoutSessionResponseDto;
        }
    }
}