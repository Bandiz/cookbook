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
		Counters = Database.GetCollection<Counter>(settings.CounterCollectionName);
		Recipes = Database.GetCollection<Recipe>(settings.RecipeCollectionName
			);
		Categories = Database.GetCollection<Category>(settings.CategoryCollectionName);
		Files = Database.GetCollection<GridFSFileInfo>(settings.ImageCollectionName);
		FilesChunks = Database.GetCollection<BsonDocument>(settings.ImageChunksCollectionName);
		ImageBucket = new GridFSBucket(Database, new() 
		{ 
			BucketName = settings.ImageBucketName 
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
