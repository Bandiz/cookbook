using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Models.Image;
using Cookbook.API.Services.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
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
	ICategoryService categoryService) : 
	IRequestHandler<UploadImagesCommand, CommandResponse>
{
	const int MaxFileSize = 5 * 1024 * 1024; // 5MB
	static readonly IReadOnlyList<string> ValidFileTypes = new List<string>
	{
		"image/jpeg",
		"image/png",
		"image/gif"
	}.AsReadOnly();

	public async Task<CommandResponse> Handle(
		UploadImagesCommand command,
		CancellationToken cancellationToken)
	{
		var files = command.Files;

		if (files == null || files.Count == 0)
		{
			return CommandResponse.BadRequest("No files uploaded");
		}

		var imageIds = new List<string>();
		var warnings = new HashSet<string>();
		var categoryName = command.CategoryName;

		foreach (var file in files)
		{
			if (file.Length > MaxFileSize)
			{
				return CommandResponse.BadRequest("File is too large");
			}

			if (!ValidFileTypes.Contains(file.ContentType))
			{
				return CommandResponse.BadRequest("Invalid file type");
			}

			var imageId = await UploadImage(
				file.OpenReadStream(),
				file.FileName,
				command.User,
				cancellationToken);

			imageIds.Add(imageId);

			if (!string.IsNullOrWhiteSpace(categoryName))
			{
				var category = await categoryService.GetCategory(categoryName);

				if (category == null)
				{
					warnings.Add($"Category {categoryName} does not exist");
				}
				else
				{
					category.Images.Add(imageId);
					await categoryService.UpdateCategory(category, cancellationToken);
				}
			}
		}

		return CommandResponse.Ok(new UploadImagesResponse(imageIds, [.. warnings]));
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
