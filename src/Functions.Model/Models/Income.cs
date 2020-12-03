using MongoDB.Bson.Serialization.Attributes;

namespace Functions.Model.Models
{
    [BsonNoId]
    public class Income
    {
        [BsonElement("id")]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("amount")]
        public decimal Amount { get; set; }

        [BsonElement("status")]
        public EntityStatus Status { get; set; }
    }
}