using Cookbook.API.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services.Interfaces;

public interface IDataAccess
{
	IMongoClient Client { get; }
	IMongoCollection<Counter> Counters { get; }
	IMongoCollection<Recipe> Recipes { get; }
	IMongoCollection<Category> Categories { get; }
	IMongoCollection<GridFSFileInfo> Files { get; }
	IMongoCollection<BsonDocument> FilesChunks { get; }
	GridFSBucket ImageBucket { get; }
}
