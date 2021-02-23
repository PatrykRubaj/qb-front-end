using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace QuantumBudget.Model.Models
{
    public class Budget
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("incomes")]
        public IList<Income> Incomes { get; set; }

        [BsonElement("categories")]
        public IList<Category> Categories { get; set; }

        [BsonElement("subcategories")]
        public IList<Subcategory> Subcategories { get; set; }

        [BsonElement("country")]
        public Country Country { get; set; }

        [BsonElement("user")]
        public User User { get; set; }
    }
}