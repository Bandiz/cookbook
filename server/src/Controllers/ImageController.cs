using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Models.Image;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Cookbook.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ImageController(IImageService imageService, ICategoryService categoryService) : ControllerBase
{
	const int MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	static readonly IReadOnlyList<string> VALID_FILE_TYPES = new List<string>
	{
		"image/jpeg",
		"image/png",
		"image/gif"
	}.AsReadOnly();

	[Authorize(Roles = "Admin")]
	[HttpPost]
	public async Task<IActionResult> UploadImages(
		[FromForm] string categoryName,
		[FromForm] List<IFormFile> files)
	{
		if (files == null || files.Count == 0)
		{
			return BadRequest("No files uploaded");
		}

		var imageIds = new List<string>(); 
		var warnings = new List<string>();

		foreach (var file in files)
		{
			if (file.Length > MAX_FILE_SIZE)
			{
				return BadRequest($"File {file.FileName} is too large");
			}

			if (!VALID_FILE_TYPES.Contains(file.ContentType))
			{
				return BadRequest($"Invalid file type for file {file.FileName}");
			}

			var imageId = await imageService.UploadImage(file.OpenReadStream(), file.FileName);
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
					await categoryService.UpdateCategory(category);
				}
			}
		}

		return Ok(new UploadImagesResponseModel(imageIds, warnings));
	}

	[AllowAnonymous]
	[HttpGet("{id}")]
	public async Task<IActionResult> GetImage(string id)
	{
		if (!ObjectId.TryParse(id, out var imageId))
		{
			return BadRequest("Invalid imageId");
		}

		var (imageStream, filename) = await imageService.GetImage(imageId);

		return File(imageStream.ToArray(), GetContentType(filename));
	}

	[AllowAnonymous]
	[HttpGet("{id}/preview")]
	public async Task<IActionResult> GetImagePreview(string id)
	{
		if (!ObjectId.TryParse(id, out var imageId))
		{
			return BadRequest("Invalid imageId");
		}

		var (imageStream, filename) = await imageService.GetImagePreview(imageId);

		return File(imageStream.ToArray(), GetContentType(filename));
	}


	[Authorize(Roles = "Admin")]
	[HttpGet("all")]
	public async Task<IActionResult> GetImageIds()
	{
		var imageIds = await imageService.GetImageIds();

		return Ok(imageIds);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("byCategory")]
	public async Task<IActionResult> GetImagesByCategory()
	{
		var imageIds = await imageService.GetImageIds();
		var categories = await categoryService.GetCategoryImages();

		var results = imageIds.Aggregate(new
		{
			Uncategorized = new List<string>(),
			Categorized = categories
		}, (acc, curr) =>
		{
			var containsCategory = false;
			foreach (var category in acc.Categorized)
			{
				if (category.Value.Contains(curr))
				{
					containsCategory = true;
					break;
				}
			}

			if (!containsCategory)
			{
				acc.Uncategorized.Add(curr);
			}

			return acc;
		});

		return Ok(new GetImagesByCategoryResponseModel(
			results.Uncategorized,
			results.Categorized.Select(x => new CategoryImageResponseModel(x.Key, x.Value)).ToList()));
	}

	[Authorize(Roles = "Admin")]
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteImage(string id)
	{
		if (!ObjectId.TryParse(id, out var imageId))
		{
			return BadRequest("Invalid imageId");
		}

		await imageService.DeleteImage(imageId);

		return Ok();
	}

	private static string GetContentType(string filename)
	{
		if (filename.EndsWith(".jpg") || filename.EndsWith(".jpeg"))
			return "image/jpeg";
		else if (filename.EndsWith(".png"))
			return "image/png";
		else if (filename.EndsWith(".gif"))
			return "image/gif";
		else
			return "application/octet-stream"; // Default to binary data
	}

}
