using MongoDB.Bson.Serialization.Attributes;

namespace QuantumBudget.Model.Models
{
    public class Country
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("currency")]
        public string Currency { get; set; }

        [BsonElement("emojiU")]
        public string EmojiU { get; set; }

        [BsonElement("key")]
        public string Key { get; set; }

        [BsonElement("language")]
        public string Language { get; set; }
    }
}