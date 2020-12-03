using MongoDB.Bson.Serialization.Attributes;

namespace Functions.Model.Models
{
    public class User
    {
        [BsonElement("agreedToNewsletter")]
        public bool AgreedToNewsletter { get; set; }

        [BsonElement("agreedToPrivacyPolicy")]
        public bool AgreedToPrivacyPolicy { get; set; }
    }
}