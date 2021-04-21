namespace QuantumBudget.Model.DTOs.Stripe
{
    public class StripeCustomerDto
    {
        public string Id { get; set; }
        public string Auth0Id { get; set; }
        public StripeSubscriptionDto Subscription { get; set; }
    }
}