using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Commands;
using Cookbook.API.Commands.Image;
using Cookbook.API.Models.Image;
using Cookbook.API.Services.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Cookbook.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ImageController(
	IImageQueries imageQueries,
	ICategoryService categoryService,
	IMediator mediator) : ControllerBase
{
	[Authorize(Roles = "Admin")]
	[HttpPost]
	public async Task<IActionResult> UploadImages(
		[FromForm] string categoryName,
		[FromForm] List<IFormFile> files,
		CancellationToken cancellationToken)
	{
		var response = await mediator.Send(new UploadImagesCommand
		{
			User = User.Identity.Name,
			CategoryName = categoryName,
			Files = files
		}, cancellationToken);

		return response switch
		{
			SuccessResponse<UploadImagesResponse> success => Ok(success.Data),
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

	[AllowAnonymous]
	[HttpGet("{id}")]
	public async Task<IActionResult> GetImage([FromRoute] string id)
	{
		if (!ObjectId.TryParse(id, out var imageId))
		{
			return NotFound();
		}

		var (imageStream, filename) = await imageQueries.GetImage(imageId);

		return File(imageStream.ToArray(), GetContentType(filename));
	}

	[AllowAnonymous]
	[HttpGet("{id}/preview")]
	public async Task<IActionResult> GetImagePreview([FromRoute] string id)
	{
		if (!ObjectId.TryParse(id, out var imageId))
		{
			return NotFound();
		}

		var (imageStream, filename) = await imageQueries.GetImagePreview(imageId);

		return File(imageStream.ToArray(), GetContentType(filename));
	}


	[Authorize(Roles = "Admin")]
	[HttpGet("all")]
	public async Task<IActionResult> GetImageIds()
	{
		var imageIds = await imageQueries.GetImageIds();

		return Ok(imageIds);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("byCategory")]
	public async Task<IActionResult> GetImagesByCategory()
	{
		var imageIds = await imageQueries.GetImageIds();
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

		return Ok(new GetImagesByCategoryResponse(
			results.Uncategorized,
			results.Categorized.Select(x => new CategoryImageResponse(x.Key, x.Value)).ToList()));
	}

	[Authorize(Roles = "Admin")]
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteImage(
		[FromRoute] string id, 
		CancellationToken cancellationToken)
	{
		var result = await mediator.Send(new DeleteImageCommand
		{
			Id = id
		}, cancellationToken);

		return result switch
		{
			SuccessResponse => Ok(),
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
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
