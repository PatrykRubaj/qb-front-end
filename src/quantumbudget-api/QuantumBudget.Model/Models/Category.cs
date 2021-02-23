using MongoDB.Bson.Serialization.Attributes;

namespace QuantumBudget.Model.Models
{
    [BsonNoId]
    public class Category
    {
        [BsonElement("id")]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("status")]
        public EntityStatus Status { get; set; }
    }
}