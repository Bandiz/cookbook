using Cookbook.API.Entities;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services.Interfaces;

public interface IDataAccess
{
	IMongoCollection<Counter> Counters { get; }
	IMongoCollection<Recipe> Recipes { get; }
	IMongoCollection<Category> Categories { get; }
	IMongoCollection<GridFSFileInfo> Files { get; }
	GridFSBucket ImageBucket { get; }
}
