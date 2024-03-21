using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Configuration;
using Cookbook.API.Entities;
using Cookbook.API.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services
{
	public class ImageService: IImageService
	{
		private readonly GridFSBucket imageBucket;

		public ImageService(CookbookDatabaseSettings settings, IMongoClient mongoClient, ICategoryService categoryService)
        {
            var cookbookDb = mongoClient.GetDatabase(settings.DatabaseName);

			imageBucket = new GridFSBucket(cookbookDb, new GridFSBucketOptions() { BucketName = "images" });
        }

		public async Task<string> UploadImage(Stream fs, string filename)
		{
			var result = await imageBucket.UploadFromStreamAsync(filename, fs);

			return result.ToString();
		}

		public async Task<(MemoryStream, string)> GetImage(string id)
		{
			var imageId = ObjectId.Parse(id); 
			var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", imageId);
			var fileInfo = (await imageBucket.FindAsync(filter)).FirstOrDefault();

			var stream = new MemoryStream();
			await imageBucket.DownloadToStreamAsync(imageId, stream);

			return (stream, fileInfo.Filename);
		}
	}
}
