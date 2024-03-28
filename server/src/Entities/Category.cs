using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Cookbook.API.Entities
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string CategoryName { get; set; }

        public bool Visible { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CteatedAt { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

		public List<string> Images { get; set; } = [];
	}
}
