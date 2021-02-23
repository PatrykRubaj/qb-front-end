using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Mailchimp
{
    public class NewSubscriberDto
    {
        public string Email { get; set; }
        public string Source { get; set; }
        public string Name { get; set; }
    }
}