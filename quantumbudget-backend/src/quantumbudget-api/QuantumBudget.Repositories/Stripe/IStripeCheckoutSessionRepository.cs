using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;

namespace QuantumBudget.Repositories.Stripe
{
    public interface IStripeCheckoutSessionRepository
    {
        Task<CreateCheckoutSessionResponseDto> CreateAsync(string stripeCustomerId, string auth0UserId, string priceId, string taxId);
    }
}