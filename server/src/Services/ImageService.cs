using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Configuration;
using Cookbook.API.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services;

public class ImageService : IImageService
{
	private readonly GridFSBucket _imageBucket;
	private readonly IMongoCollection<GridFSFileInfo> _fileCollection;

	public ImageService(CookbookDatabaseSettings settings, IMongoClient mongoClient)
	{
		var cookbookDb = mongoClient.GetDatabase(settings.DatabaseName);
		_fileCollection = cookbookDb.GetCollection<GridFSFileInfo>("images.files");
		_imageBucket = new GridFSBucket(cookbookDb, new GridFSBucketOptions() { BucketName = "images" });
	}

	public async Task<string> UploadImage(Stream fs, string filename)
	{
		var result = await _imageBucket.UploadFromStreamAsync(filename, fs);

		return result.ToString();
	}

	public async Task<(MemoryStream, string)> GetImage(string id)
	{
		var imageId = ObjectId.Parse(id);
		var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", imageId);
		var fileInfo = (await _imageBucket.FindAsync(filter)).FirstOrDefault();

		var stream = new MemoryStream();
		await _imageBucket.DownloadToStreamAsync(imageId, stream);

		return (stream, fileInfo.Filename);
	}

	public async Task<string[]> GetImageIds()
	{
		var projection = Builders<GridFSFileInfo>.Projection.Include("_id");
		var cursor = await _fileCollection
			.Find(Builders<GridFSFileInfo>.Filter.Empty)
			.Project(projection)
			.ToCursorAsync();
		var imageIds = cursor
			.ToEnumerable()
			.Select(doc => doc["_id"].ToString())
			.ToArray();

		return imageIds;
	}

	public async Task<List<string>> CheckExistingImages(List<ObjectId> imageIds)
	{
		var filter = Builders<GridFSFileInfo>.Filter.In("_id", imageIds);
		var projection = Builders<GridFSFileInfo>.Projection.Include("_id");

		var cursor = await _fileCollection
			.Find(filter)
			.Project(projection)
			.ToCursorAsync();

		var existingIdStrings = cursor
			.ToEnumerable()
			.Select(doc => doc["_id"].ToString())
			.ToList();

		var missingIds = imageIds.Select(x => x.ToString()).Except(existingIdStrings).ToList();

		return missingIds;
	}
}
