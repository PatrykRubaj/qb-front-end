using Newtonsoft.Json;

namespace Functions.Model.DTOs.Mailchimp
{
    public class NewSubscriber
    {
        public string Email { get; set; }
        public string Source { get; set; }
        public string Name { get; set; }
    }
}