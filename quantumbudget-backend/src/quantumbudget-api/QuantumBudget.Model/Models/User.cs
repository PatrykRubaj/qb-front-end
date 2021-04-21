using MongoDB.Bson.Serialization.Attributes;

namespace QuantumBudget.Model.Models
{
    public class User
    {
        [BsonElement("agreedToNewsletter")]
        public bool? AgreedToNewsletter { get; set; }

        [BsonElement("agreedToPrivacyPolicy")]
        public bool? AgreedToPrivacyPolicy { get; set; }
        
        [BsonElement("agreedToTermsOfService")]
        public bool? AgreedToTermsOfService { get; set; }
    }
}