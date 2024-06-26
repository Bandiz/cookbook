using Cookbook.API.Configuration;
using Cookbook.API.Entities;
using Cookbook.API.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services;

public class DataAccess : IDataAccess
{
	public DataAccess(CookbookDatabaseSettings settings, IMongoClient mongoClient)
	{
		Database = mongoClient.GetDatabase(settings.DatabaseName);
		Counters = Database.GetCollection<Counter>("counters");
		Recipes = Database.GetCollection<Recipe>("recipes");
		Categories = Database.GetCollection<Category>("categories");
		Files = Database.GetCollection<GridFSFileInfo>("images.files");
		FilesChunks = Database.GetCollection<BsonDocument>("images.chunks");
		ImageBucket = new GridFSBucket(Database, new() 
		{ 
			BucketName = "images" 
		});
	}

	private IMongoDatabase Database { get; }

	public IMongoClient Client => Database.Client;

	public IMongoCollection<Counter> Counters { get; }

	public IMongoCollection<Recipe> Recipes { get; }

	public IMongoCollection<Category> Categories { get; }

	public IMongoCollection<GridFSFileInfo> Files { get; }

	public IMongoCollection<BsonDocument> FilesChunks { get; }

	public GridFSBucket ImageBucket { get; }

}
