using Cookbook.API.Configuration;
using Cookbook.API.Entities;
using Cookbook.API.Services.Interfaces;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services;

public class DataAccess : IDataAccess
{
	private readonly IMongoDatabase _database;

	public DataAccess(CookbookDatabaseSettings settings, IMongoClient mongoClient)
	{
		_database = mongoClient.GetDatabase(settings.DatabaseName);
		Counters = _database.GetCollection<Counter>(settings.CounterCollectionName);
		Recipes = _database.GetCollection<Recipe>(settings.RecipeCollectionName
			);
		Categories = _database.GetCollection<Category>(settings.CategoryCollectionName);
		Files = _database.GetCollection<GridFSFileInfo>(settings.ImageCollectionName);
		ImageBucket = new GridFSBucket(_database, new() 
		{ 
			BucketName = settings.ImageBucketName 
		});
	}

	public IMongoCollection<Counter> Counters { get; }

	public IMongoCollection<Recipe> Recipes { get; }

	public IMongoCollection<Category> Categories { get; }

	public IMongoCollection<GridFSFileInfo> Files { get; }

	public GridFSBucket ImageBucket { get; }

}
