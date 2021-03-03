namespace QuantumBudget.Model.Options
{
    public class MailchimpConfiguration
    {
        public const string Mailchimp = "Mailchimp";

        public string ApiUrl { get; set; }
        public string ApiKey { get; set; }
        public string AudienceId { get; set; }
        public string MarketingPermissionIdForEmail { get; set; }
    }
}