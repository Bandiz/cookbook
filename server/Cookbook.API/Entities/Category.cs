using System;
using System.Collections.Generic;
using Cookbook.API.Extensions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Cookbook.API.Entities;

public class Category
{
	private string _categoryName;

	[BsonId]
	[BsonRepresentation(BsonType.String)]
	public string CategoryName
	{
		get => _categoryName;

		set =>
			_categoryName = value
				.ToLower()
				.Trim()
				.CapitalizeFirstLetter();
	}

	public bool Visible { get; set; }

	public string CreatedBy { get; set; }

	public DateTime CreatedAt { get; set; }

	public string UpdatedBy { get; set; }

	public DateTime? UpdatedAt { get; set; }

	public List<string> Images { get; set; } = [];

	public string MainImage { get; set; }

	public bool IsFeatured { get; set; }
}
