using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Commands;
using Cookbook.API.Commands.Category;
using Cookbook.API.Extensions;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CategoryController(
	IMediator mediator,
	ICategoryService categoryService,
	IRecipeService recipeService,
	IImageService imageService) : ControllerBase
{
	[AllowAnonymous]
	[HttpGet]
	public IActionResult GetCategories()
	{
		var categories = categoryService
			.GetCategories()
			.Select(x => x.CategoryName);
		return Ok(categories);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{categoryName}")]
	public async Task<IActionResult> GetCategory(string categoryName)
	{
		var category = await categoryService.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}

		return Ok(new CategoryResponse(category));
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("list")]
	public IActionResult GetCategoriesList()
	{
		var categories = categoryService
			.GetCategories(false)
			.Select(x => new CategoryResponse(x));
		return Ok(categories);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{categoryName}/recipes")]
	public async Task<IActionResult> GetCategoryDetails(string categoryName)
	{
		var category = categoryService.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}
		var recipes = await recipeService.GetAllRecipes([categoryName]);

		return Ok(
			new CategoryRecipesResponse(recipes.Select(x =>
				new CategoryRecipeResponse(
					x.Id,
					x.Title,
					categoryName,
					x.CreatedBy,
					x.CreatedAt,
					x.UpdatedBy,
					x.UpdatedAt)).ToList()));
	}

	[Authorize(Roles = "Admin")]
	[HttpPost]
	public async Task<IActionResult> CreateCategory(
		[FromBody] CreateCategoryRequest request,
		CancellationToken token)
	{
		var response = await mediator.Send(new CreateCategoryCommand()
		{
			Request = request,
			User = User.Identity.Name
		});

		return response switch
		{
			SuccessResponse<CategoryResponse> success => CreatedAtAction(
				nameof(GetCategory),
				new { categoryName = success.Data.CategoryName },
				success.Data
			),
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

	[Authorize(Roles = "Admin")]
	[HttpDelete("{categoryName}")]
	public IActionResult DeleteCategory(string categoryName)
	{
		if (string.IsNullOrEmpty(categoryName))
		{
			return BadRequest("Category name required");
		}
		var existingCategory = categoryService.GetCategory(categoryName);

		if (existingCategory == null)
		{
			return NotFound(categoryName);
		}

		// TODO: create admin warnings
		recipeService.RemoveCategoryAll(categoryName);
		categoryService.DeleteCategory(categoryName);

		return Ok();
	}

	[Authorize(Roles = "Admin")]
	[HttpPut("{categoryName}")]
	public async Task<IActionResult> UpdateCategory(
		string categoryName,
		[FromBody] UpdateCategoryRequest model)
	{
		if (string.IsNullOrEmpty(categoryName))
		{
			return BadRequest("Category name required");
		}
		var existingCategory = await categoryService.GetCategory(categoryName);

		if (existingCategory == null)
		{
			return NotFound(categoryName);
		}

		var updated = false;

		if (model.Visible.HasValue && existingCategory.Visible != model.Visible)
		{
			existingCategory.Visible = model.Visible.Value;
			updated = true;
		}

		if (!string.IsNullOrEmpty(model.MainImage) || model.Images != null)
		{
			IEnumerable<string> imagesToCheck = [model.MainImage, .. model.Images ?? []];

			var (parsedImageIds, failedParsedIds) = imagesToCheck.ParseImageIds();

			if (failedParsedIds.Count != 0)
			{
				return BadRequest($"Image id's are incorrect [{string.Join(", ", failedParsedIds)}]");
			}

			var missingIds = await imageService.CheckExistingImages(parsedImageIds);

			if (missingIds.Count != 0)
			{
				return BadRequest($"Image id's that do not exist [{string.Join(", ", missingIds)}]");
			}

			if (existingCategory.MainImage != model.MainImage)
			{
				existingCategory.MainImage = model.MainImage;
				updated = true;
			}

			if (model.Images != null)
			{
				existingCategory.Images = model.Images.Distinct().ToList();
				updated = true;
			}
		}

		if (updated)
		{
			existingCategory.UpdatedAt = DateTime.UtcNow;
			existingCategory.UpdatedBy = User.Identity.Name;
			await categoryService.UpdateCategory(existingCategory);
		}

		return Ok(new CategoryResponse(existingCategory));
	}

}
