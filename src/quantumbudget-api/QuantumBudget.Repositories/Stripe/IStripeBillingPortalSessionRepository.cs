using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;

namespace QuantumBudget.Repositories.Stripe
{
    public interface IStripeBillingPortalSessionRepository
    {
        Task<CustomerPortalSessionResponseDto> CreateAsync(string stripeCustomerId);
    }
}