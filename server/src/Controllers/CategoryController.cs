using System;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CategoryController(
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
	public IActionResult GetCategory(string categoryName)
	{
		var category = categoryService.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}

		return Ok(new CategoryResponseModel(category));
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("list")]
	public IActionResult GetCategoriesList()
	{
		var categories = categoryService
			.GetCategories(false)
			.Select(x => new CategoryResponseModel(x));
		return Ok(categories);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{categoryName}/recipes")]
	public IActionResult GetCategoryDetails(string categoryName)
	{
		var category = categoryService.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}
		var recipes = recipeService.GetRecipes(null, 0, [categoryName]);

		return Ok(
			new CategoryRecipesResponseModel(recipes.Select(x =>
				new CategoryRecipeResponseModel(
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
	public IActionResult CreateCategory(
		[FromBody] CreateCategoryRequestModel model)
	{
		if (model == null)
		{
			return NotFound(ModelState);
		}
		var existingCategory = categoryService.GetCategory(model.CategoryName);

		if (existingCategory != null)
		{
			return BadRequest($"Category exists: {model.CategoryName}");
		}

		var category = new Category()
		{
			CategoryName = model.CategoryName,
			Visible = model.Visible,
			CreatedBy = User.Identity.Name,
			CreatedAt = DateTime.UtcNow
		};

		categoryService.CreateCategory(category);

		return CreatedAtAction(
			nameof(GetCategory),
			new { category.CategoryName },
			new CategoryResponseModel(category)
		);
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

		recipeService.RemoveCategoryAll(categoryName);
		categoryService.DeleteCategory(categoryName);

		return Ok();
	}

	[Authorize(Roles = "Admin")]
	[HttpPut("{categoryName}")]
	public async Task<IActionResult> UpdateCategory(
		string categoryName,
		[FromBody] UpdateCategoryRequestModel model)
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

		var updated = false;

		if (model.Visible.HasValue && existingCategory.Visible != model.Visible)
		{
			existingCategory.Visible = model.Visible.Value;
			updated = true;
		}

		if (!string.IsNullOrEmpty(model.MainImage))
		{
			var missingIds = await imageService.CheckExistingImages([model.MainImage]);

			if (missingIds.Count != 0)
			{
				return BadRequest($"Image does not exist");
			}

			existingCategory.MainImage = model.MainImage;
			updated = true;
		}

		if (updated)
		{
			existingCategory.UpdatedAt = DateTime.UtcNow;
			existingCategory.UpdatedBy = User.Identity.Name;
			categoryService.UpdateCategory(existingCategory);
		}

		return Ok(new CategoryResponseModel(existingCategory));
	}

	[Authorize(Roles = "Admin")]
	[HttpPut("{categoryName}/images")]
	public async Task<IActionResult> AddImages(
		string categoryName,
		[FromBody] CategoryImagesRequestModel model)
	{
		if (string.IsNullOrEmpty(categoryName))
		{
			return BadRequest("Category name required");
		}
		if (model.ImageIds.Count == 0)
		{
			return BadRequest("No image id's were provided");
		}
		var existingCategory = categoryService.GetCategory(categoryName);

		if (existingCategory == null)
		{
			return NotFound(categoryName);
		}

		var missingIds = await imageService.CheckExistingImages(model.ImageIds);

		if (missingIds.Count != 0)
		{
			return BadRequest($"Image id's that do not exist [{string.Join(", ", missingIds)}]");
		}

		var imagesBefore = existingCategory.Images.Count;

		var uniqueIds = model.ImageIds.Except(existingCategory.Images).ToList();

		if (uniqueIds.Count > 0)
		{
			existingCategory.Images.AddRange(uniqueIds);
		}

		if (imagesBefore != existingCategory.Images.Count)
		{
			existingCategory.UpdatedAt = DateTime.UtcNow;
			existingCategory.UpdatedBy = User.Identity.Name;
			categoryService.UpdateCategory(existingCategory);
		}

		return Ok(new CategoryResponseModel(existingCategory));
	}

	[Authorize(Roles = "Admin")]
	[HttpDelete("{categoryName}/images")]
	public IActionResult RemoveImages(
		string categoryName,
		[FromBody] CategoryImagesRequestModel model)
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

		if (model.ImageIds.Count == 0)
		{
			return Ok(new CategoryResponseModel(existingCategory));
		}

		var imagesBefore = existingCategory.Images.Count;

		existingCategory.Images.RemoveAll(model.ImageIds.Contains);

		if (imagesBefore != existingCategory.Images.Count)
		{
			existingCategory.UpdatedAt = DateTime.UtcNow;
			existingCategory.UpdatedBy = User.Identity.Name;
			categoryService.UpdateCategory(existingCategory);
		}

		return Ok(new CategoryResponseModel(existingCategory));
	}
}
