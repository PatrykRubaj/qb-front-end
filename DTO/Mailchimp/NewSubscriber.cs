using Newtonsoft.Json;

namespace DTO.Mailchimp
{
    public class NewSubscriber
    {
        public string Email { get; set; }
        public string Source { get; set; }
        public string Name { get; set; }
    }
}