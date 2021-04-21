namespace QuantumBudget.Model.Options
{
    public class Auth0Configuration
    {
        public const string Auth0 = "Auth0";
        
        public string Instance { get; set; }
        public string TenantId { get; set; }
        public string Audience { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
}