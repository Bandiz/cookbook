using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Cookbook.API.Entities;

public class Recipe
{
	[BsonId]
	[BsonRepresentation(BsonType.Int64)]
	public int Id { get; set; }

	public string Title { get; set; }

	public string Description { get; set; }

	public int PrepTimeMinutes { get; set; }

	public int CookTimeMinutes { get; set; }

	public int TotalTimeMinutes { get; set; }

	public string MainImage { get; set; }

	public string CreatedBy { get; set; }

	public DateTime CreatedAt { get; set; }

	public string UpdatedBy { get; set; }

	public DateTime? UpdatedAt { get; set; }

	public ICollection<string> Categories { get; set; }

	public ICollection<Instruction> Instructions { get; set; }

	public ICollection<Ingredient> Ingredients { get; set; }

	public bool IsPublished { get; set; }

}
