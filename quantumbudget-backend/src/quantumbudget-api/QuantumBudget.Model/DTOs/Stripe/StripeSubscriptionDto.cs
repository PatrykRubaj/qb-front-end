namespace QuantumBudget.Model.DTOs.Stripe
{
    public class StripeSubscriptionDto
    {
        public string Id { get; set; }
        public string CustomerId { get; set; }
        public string Status { get; set; }
    }
    
    public enum SubscriptionStatus
    {
        Incomplete,
        IncompleteExpired,
        Trialing,
        Active,
        PastDue,
        Canceled,
        Unpaid
    }
}