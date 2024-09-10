using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using Cookbook.API.Validators.Image;
using MediatR;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using SkiaSharp;

namespace Cookbook.API.Commands.Image;

public class UploadImagesCommand : IRequest<CommandResponse>
{
	public string User { get; set; }
	public string CategoryName { get; set; }
	public List<IFormFile> Files { get; set; }
}

public class UploadImagesCommandHandler(
	IDataAccess dataAccess,
	ICategoryQueries categoryQueries,
	UploadImagesCommandValidator validator) : 
	IRequestHandler<UploadImagesCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UploadImagesCommand command,
		CancellationToken cancellationToken)
	{
		var result = await validator.ValidateAsync(command, cancellationToken);

		if (!result.IsValid)
		{
			return CommandResponse.Invalid(result);
		}

		var files = command.Files;
		var imageIds = new List<string>();
		var warnings = new HashSet<string>();
		var categoryName = command.CategoryName;

		foreach (var file in files)
		{
			var imageId = await UploadImage(
				file.OpenReadStream(),
				file.FileName,
				command.User,
				cancellationToken);

			imageIds.Add(imageId);

			if (!string.IsNullOrWhiteSpace(categoryName))
			{
				var category = await categoryQueries.GetCategory(categoryName);

				if (category == null)
				{
					warnings.Add($"Category {categoryName} does not exist");
				}
				else
				{
					category.Images.Add(imageId);
					category.UpdatedAt = DateTime.UtcNow;
					category.UpdatedBy = command.User;

					await dataAccess.Categories.ReplaceOneAsync(
						x => x.CategoryName == category.CategoryName,
						category, 
						cancellationToken: cancellationToken);
				}
			}
		}

		return CommandResponse.Ok<(List<string>, List<string>)>(
			(imageIds, [.. warnings]));
	}

	private async Task<string> UploadImage(
		Stream fs,
		string filename,
		string userName,
		CancellationToken cancellationToken)
	{
		var imageBucket = dataAccess.ImageBucket;
		using var ms = new MemoryStream();
		await fs.CopyToAsync(ms, cancellationToken);
		ms.Position = 0;
		ms.Seek(0, SeekOrigin.Begin);
		var result = await imageBucket.UploadFromStreamAsync(
			filename, ms, new()
		{
			Metadata = new()
			{
				{ "createdBy", userName }
			}
		}, cancellationToken);

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

			var previewImage = await imageBucket.UploadFromStreamAsync(
				$"preview-{filename}", previewMs, new()
			{
				Metadata = new()
				{
					{ "createdBy", userName },
					{ "parentImage", result }
				}
			}, cancellationToken);
		}

		return result.ToString();
	}
}
