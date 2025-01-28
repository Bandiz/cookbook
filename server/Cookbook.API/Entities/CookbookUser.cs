using System;
using AspNetCore.Identity.Mongo.Model;
using MongoDB.Bson.Serialization.Attributes;

namespace Cookbook.API.Entities;

[BsonIgnoreExtraElements]
public class CookbookUser : MongoUser
{
	public string Name { get; set; }

	public string LastName { get; set; }

	public string FullName { get; set; }

	public string GoogleId { get; set; }

	public string UpdatedBy { get; set; }

	public DateTime? UpdatedAt { get; set; }

	[BsonIgnore]
	public bool IsAdmin
	{
		get
		{
			return Roles.Contains("Admin");
		}
	}
}
