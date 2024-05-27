using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services;

public class ImageService(IDataAccess dataAccess) : IImageService
{
	private readonly GridFSBucket _imageBucket = dataAccess.ImageBucket;
	private readonly IMongoCollection<GridFSFileInfo> _files = dataAccess.Files;

	public async Task<string> UploadImage(Stream fs, string filename, int? recipeId = null, List<string> categories = null)
	{
		var options = new GridFSUploadOptions();

		if (recipeId.HasValue)
		{
			options.Metadata = new BsonDocument
			{
				{ "recipes", new BsonArray(new [] { recipeId.Value }) }
			};
		}

		if (categories != null)
		{
			options.Metadata ??= [];
			options.Metadata.Add("categories", new BsonArray(categories));
		}

		var result = await _imageBucket.UploadFromStreamAsync(filename, fs, options);

		return result.ToString();
	}

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
		var cursor = await _files
			.Find(Builders<GridFSFileInfo>.Filter.Empty)
			.Project(projection)
			.ToCursorAsync();
		var imageIds = cursor
			.ToEnumerable()
			.Select(doc => new { id = doc["_id"].ToString()	})
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

	public async Task SetMetadata(ObjectId imageId, string metadataKey, string metadataValue)
	{
		var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", imageId);
		var update = Builders<GridFSFileInfo>.Update.Set(x => x.Metadata[metadataKey], new BsonArray(new[] { metadataValue }));

		await _files.UpdateOneAsync(filter, update);
	}

	public async Task DeleteImage(ObjectId imageId)
	{
		// TODO: Check if image is used in any recipes or categories
		await _imageBucket.DeleteAsync(imageId);
	}

	public async Task<List<ImageInfo>> GetImageByCategory()
	{
		var filter = Builders<GridFSFileInfo>.Filter.Empty;

		var cursor = await _imageBucket.FindAsync(filter);

		var list = await cursor.ToListAsync();
		var flattened = list.Select(x =>
		{
			List<string> categories = null;
			if (x.Metadata is not null
				&& x.Metadata.TryGetValue("categories", out var categoriesValue)
				&& categoriesValue is BsonArray categoriesArray)
			{
				categories = categoriesArray.Select(x => x.AsString).ToList();
			}

			return new ImageInfo(x.Id.ToString(), categories ?? []);
		});

		return flattened.ToList();
	}
}
