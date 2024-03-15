using Cookbook.API.Entities;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cookbook.API.Controllers
{
	[Authorize]
	[Route("api/category")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryService categoryService;
		private readonly IRecipeService recipeService;

		public CategoryController(ICategoryService categoryService, IRecipeService recipeService)
		{
			this.categoryService = categoryService;
			this.recipeService = recipeService;
		}

		[AllowAnonymous]
		[HttpGet]
		public IActionResult GetCategories()
		{
			var categories = categoryService.GetCategories().Select(x => x.CategoryName);
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

			return Ok(MapCategoryResponse(category));
		}


		[Authorize(Roles = "Admin")]
		[HttpGet("list")]
		public IActionResult GetCategoriesList()
		{
			var categories = categoryService.GetCategories(false).Select(MapCategoryResponse);
			return Ok(categories);
		}

		[Authorize(Roles = "Admin")]
		[HttpGet("{categoryName}/details")]
		public IActionResult GetCategoryDetails(string categoryName)
		{
			var category = categoryService.GetCategory(categoryName);

			if (category == null)
			{
				return NotFound(categoryName);
			}
			var recipes = recipeService.GetRecipes(null, 0, new List<string>() { categoryName });
			return Ok(new CategoryDetailsResponseModel()
			{
				Recipes = recipes.Select(x => new CategoryRecipeResponseModel()
				{
					Id = x.Id,
					Title = x.Title,
					CreatedBy = x.CreatedBy,
					CreatedAt = x.CreatedAt,
					UpdatedBy = x.UpdatedBy,
					UpdatedAt = x.UpdatedAt,
				}).ToList()
			});
		}

		[Authorize(Roles = "Admin")]
		[HttpPost]
		public IActionResult CreateCategory(CreateCategoryRequestModel model)
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
				CteatedAt = DateTime.UtcNow
			};


			categoryService.CreateCategory(category);

			return CreatedAtAction(
				nameof(GetCategory),
				new { CategoryName = category.CategoryName },
				MapCategoryResponse(category)
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
		[HttpPut("{categoryName}/visible/{visible:bool}")]
		public IActionResult Visible(string categoryName, bool visible)
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

			if (existingCategory.Visible != visible)
			{
				existingCategory.Visible = visible;
				existingCategory.UpdatedAt = DateTime.UtcNow;
				existingCategory.UpdatedBy = User.Identity.Name;
				categoryService.UpdateCategory(existingCategory);
			}

			return Ok(MapCategoryResponse(existingCategory));
		}

		private static CategoryResponseModel MapCategoryResponse(Category category)
		{
			return new CategoryResponseModel()
			{
				CategoryName = category.CategoryName,
				Visible = category.Visible,
				CreatedBy = category.CreatedBy,
				CreatedAt = category.CteatedAt,
				UpdatedBy = category.UpdatedBy,
				UpdatedAt = category.UpdatedAt
			};
		}
	}
}
