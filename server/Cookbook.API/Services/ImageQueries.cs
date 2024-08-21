using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services;

public class ImageQueries(IDataAccess dataAccess) : IImageQueries
{
	private readonly GridFSBucket _imageBucket = dataAccess.ImageBucket;
	private readonly IMongoCollection<GridFSFileInfo> _files = dataAccess.Files;

	public async Task<(MemoryStream, string)> GetImage(ObjectId imageId)
	{
		var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", imageId);
		var fileInfo = (await _imageBucket.FindAsync(filter)).FirstOrDefault();

		var stream = new MemoryStream();
		await _imageBucket.DownloadToStreamAsync(imageId, stream);

		return (stream, fileInfo.Filename);
	}

	public async Task<string[]> GetImageIds()
	{
		var projection = Builders<GridFSFileInfo>.Projection
			.Include("_id");
		var parentImageExists = Builders<GridFSFileInfo>.Filter.Exists("metadata.parentImage");
		var cursor = await _files
			.Find(Builders<GridFSFileInfo>.Filter.Not(parentImageExists))
			.Project(projection)
			.ToCursorAsync();
		var imageIds = cursor
			.ToEnumerable()
			.Select(doc => new { id = doc["_id"].ToString() })
			.ToList();

		return imageIds.Select(x => x.id).ToArray();
	}

	public async Task<List<string>> CheckExistingImages(List<ObjectId> imageIds)
	{
		var filter = Builders<GridFSFileInfo>.Filter.In("_id", imageIds);
		var projection = Builders<GridFSFileInfo>.Projection.Include("_id");

		var cursor = await _files
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

	public async Task<(MemoryStream, string)> GetImagePreview(ObjectId imageId)
	{
		var filter = Builders<GridFSFileInfo>.Filter.Eq("metadata.parentImage", imageId);
		var fileInfo = (await _imageBucket.FindAsync(filter)).FirstOrDefault();

		if (fileInfo == null)
		{
			return await GetImage(imageId);
		}

		var stream = new MemoryStream();
		await _imageBucket.DownloadToStreamAsync(fileInfo.Id, stream);

		return (stream, fileInfo.Filename);
	}
}
