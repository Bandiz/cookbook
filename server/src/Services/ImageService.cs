﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Services;

public class ImageService(IDataAccess dataAccess, IHttpContextAccessor httpContextAccessor) : IImageService
{
	private readonly GridFSBucket _imageBucket = dataAccess.ImageBucket;
	private readonly IMongoCollection<GridFSFileInfo> _files = dataAccess.Files;
	private readonly IMongoCollection<BsonDocument> _filesChunks = dataAccess.FilesChunks;

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

	public async Task SetMetadata(ObjectId imageId, string metadataKey, string metadataValue)
	{
		var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", imageId);
		var update = Builders<GridFSFileInfo>.Update.Set(x => x.Metadata[metadataKey], new BsonArray(new[] { metadataValue }));

		await _files.UpdateOneAsync(filter, update);
	}

	public async Task DeleteImage(ObjectId imageId)
	{
		using var session = dataAccess.Client.StartSession();
		try
		{
			session.StartTransaction();

			var metadata = (await _files.FindOneAndDeleteAsync(session, Builders<GridFSFileInfo>.Filter.Eq("_id", imageId))).Metadata;

			await _filesChunks.DeleteManyAsync(session, Builders<BsonDocument>.Filter.Eq("files_id", imageId));

			var imageIdString = imageId.ToString();
			var userName = httpContextAccessor.HttpContext.User.Identity.Name;

			if (metadata.TryGetValue("recipes", out var recipesValue) && recipesValue is BsonArray recipesArray)
			{
				foreach (var recipeId in recipesArray.Select(x => x.AsInt32))
				{
					var filter = Builders<Recipe>.Filter.Eq("_id", recipeId);
					var recipe = (await dataAccess.Recipes.FindAsync(session, filter)).Single();
					var isUpdated = false;

					if (recipe.MainImage == imageIdString)
					{
						isUpdated = true;
						recipe.MainImage = null;
						//TODO: create system warring for admin
					}

					if (isUpdated)
					{
						recipe.UpdatedAt = DateTime.UtcNow;
						recipe.UpdatedBy = userName;
						await dataAccess.Recipes.ReplaceOneAsync(session, filter, recipe);
					}
				}
			}

			if (metadata.TryGetValue("categories", out var categoriesValue) && categoriesValue is BsonArray categoriesArray)
			{
				foreach (var categoryName in categoriesArray.Select(x => x.AsString))
				{
					var filter = Builders<Category>.Filter.Eq("categoryName", categoryName);
					var category = (await dataAccess.Categories.FindAsync(session, filter)).Single();
					var isUpdated = false;

					if (category.MainImage == imageIdString)
					{
						isUpdated = true;
						category.MainImage = null;
						//TODO: create system warring for admin
					}

					if (category.Images.Contains(imageIdString))
					{
						isUpdated = true;
						category.Images.Remove(imageIdString);
					}

					if (isUpdated)
					{
						category.UpdatedAt = DateTime.UtcNow;
						category.UpdatedBy = userName;
						await dataAccess.Categories.ReplaceOneAsync(session, filter, category);
					}
				}
			}

		}
		catch (Exception)
		{
			session.AbortTransaction();
			throw;
		}

		session.CommitTransaction();
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
