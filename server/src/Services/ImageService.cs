using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using SkiaSharp;

namespace Cookbook.API.Services;

public class ImageService(
	IDataAccess dataAccess,
	IHttpContextAccessor httpContextAccessor) : IImageService
{
	private readonly GridFSBucket _imageBucket = dataAccess.ImageBucket;
	private readonly IMongoCollection<GridFSFileInfo> _files = dataAccess.Files;

	public async Task<string> UploadImage(Stream fs, string filename)
	{
		var userName = httpContextAccessor.HttpContext.User.Identity.Name;
		using var ms = new MemoryStream();
		await fs.CopyToAsync(ms);
		ms.Position = 0;
		ms.Seek(0, SeekOrigin.Begin);
		var result = await _imageBucket.UploadFromStreamAsync(filename, ms, new()
		{
			Metadata = new()
			{
				{ "createdBy", userName }
			}
		});

		ms.Position = 0;
		ms.Seek(0, SeekOrigin.Begin);

		var format = Path.GetExtension(filename) switch
		{
			".jpg" => SKEncodedImageFormat.Jpeg,
			".png" => SKEncodedImageFormat.Png,
			".gif" => SKEncodedImageFormat.Gif,
			_ => SKEncodedImageFormat.Png
		};

        using (var image = SKBitmap.Decode(ms))
        {
            double maxWidth = 200;
            double maxHeight = 200;

            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var info = new SKImageInfo(newWidth, newHeight);
            var newImage = image.Resize(info, SKFilterQuality.Low);

            var previewMs = new MemoryStream();
            using (var resizedImage = SKImage.FromBitmap(newImage))
            {
                var data = resizedImage.Encode(format, 30);
                data.SaveTo(previewMs);
            }

			previewMs.Position = 0;
			previewMs.Seek(0, SeekOrigin.Begin);

			var previewImage = await _imageBucket.UploadFromStreamAsync($"preview-{filename}", previewMs, new()
			{
				Metadata = new()
				{
					{ "createdBy", userName },
					{ "parentImage", result }
				}
			});
		}

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

	public async Task DeleteImage(ObjectId imageId)
	{
		var filter = Builders<GridFSFileInfo>.Filter.Eq("metadata.parentImage", imageId);
		var fileInfo = (await _imageBucket.FindAsync(filter)).FirstOrDefault();

		if (fileInfo != null)
		{
			await _imageBucket.DeleteAsync(fileInfo.Id);
		}
		await _imageBucket.DeleteAsync(imageId);
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
