using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Cookbook.API.Entities;

public class Counter
{
	[BsonId]
	[BsonRepresentation(BsonType.String)]
	public string Id { get; set; }

	public int Sequence { get; set; }
}
