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
[Route("[controller]")]
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
		[FromForm] List<IFormFile> files,
		[FromQuery] List<string> categories,
		[FromQuery] int? recipeId)
	{
		if (files == null || files.Count == 0)
		{
			return BadRequest("No files uploaded");
		}
		foreach (var category in categories)
		{
			if (!await categoryService.CheckIfExists(category))
			{
				return BadRequest($"Category {category} does not exist");
			}
		}	

		var imageIds = new List<string>();

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

			var imageId = await imageService.UploadImage(file.OpenReadStream(), file.FileName, recipeId, categories);
			imageIds.Add(imageId);
		}

		return Ok(new UploadImagesResponseModel(imageIds));
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
		var imageInfo = await imageService.GetImageByCategory();

		var results = imageInfo.Aggregate(new
		{
			Uncategorized = new List<string>(),
			Categorized = new Dictionary<string, List<string>>()
		}, (acc, curr) => {
			if (curr.Categories.Count > 0)
			{
				foreach(var category in curr.Categories)
				{
					if (!acc.Categorized.TryGetValue(category, out var value))
					{
						value = ([]);
						acc.Categorized[category] = value;
					}

					value.Add(curr.Id);
				}
			} 
			else
			{
				acc.Uncategorized.Add(curr.Id);
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
