using Cookbook.API.Entities;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookbook.API.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryService _categoryService;
		private readonly IRecipeService _recipeService;
		private readonly IImageService _imageService;

		public CategoryController(ICategoryService categoryService, IRecipeService recipeService, IImageService imageService)
		{
			_categoryService = categoryService;
			_recipeService = recipeService;
			_imageService = imageService;
		}

		[AllowAnonymous]
		[HttpGet]
		public IActionResult GetCategories()
		{
			var categories = _categoryService.GetCategories().Select(x => x.CategoryName);
			return Ok(categories);
		}


		[Authorize(Roles = "Admin")]
		[HttpGet("{categoryName}")]
		public IActionResult GetCategory(string categoryName)
		{
			var category = _categoryService.GetCategory(categoryName);

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
			var categories = _categoryService.GetCategories(false).Select(MapCategoryResponse);
			return Ok(categories);
		}

		[Authorize(Roles = "Admin")]
		[HttpGet("{categoryName}/details")]
		public IActionResult GetCategoryDetails(string categoryName)
		{
			var category = _categoryService.GetCategory(categoryName);

			if (category == null)
			{
				return NotFound(categoryName);
			}
			var recipes = _recipeService.GetRecipes(null, 0, [categoryName]);
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
			var existingCategory = _categoryService.GetCategory(model.CategoryName);

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


			_categoryService.CreateCategory(category);

			return CreatedAtAction(
				nameof(GetCategory),
				new { category.CategoryName },
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
			var existingCategory = _categoryService.GetCategory(categoryName);

			if (existingCategory == null)
			{
				return NotFound(categoryName);
			}
			_recipeService.RemoveCategoryAll(categoryName);
			_categoryService.DeleteCategory(categoryName);

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
			var existingCategory = _categoryService.GetCategory(categoryName);

			if (existingCategory == null)
			{
				return NotFound(categoryName);
			}

			if (existingCategory.Visible != visible)
			{
				existingCategory.Visible = visible;
				existingCategory.UpdatedAt = DateTime.UtcNow;
				existingCategory.UpdatedBy = User.Identity.Name;
				_categoryService.UpdateCategory(existingCategory);
			}

			return Ok(MapCategoryResponse(existingCategory));
		}

		[Authorize(Roles = "Admin")]
		[HttpPut("{categoryName}/images")]
		public async Task<IActionResult> AddImages(string categoryName, [FromBody] List<string> imagesIds)
		{
			if (string.IsNullOrEmpty(categoryName))
			{
				return BadRequest("Category name required");
			}
			if (imagesIds.Count == 0)
			{
				return BadRequest("No image id's were provided");
			}
			var existingCategory = _categoryService.GetCategory(categoryName);

			if (existingCategory == null)
			{
				return NotFound(categoryName);
			}

			var missingIds = await _imageService.CheckExistingImages(imagesIds);

			if (missingIds.Count != 0) {
				return BadRequest($"Image id's that do not exist [{string.Join(", ", missingIds)}]");
			}

			var imagesBefore = existingCategory.Images.Count;

			existingCategory.Images.AddRange(imagesIds);

			if(imagesBefore != existingCategory.Images.Count)
			{
				existingCategory.UpdatedAt = DateTime.UtcNow;
				existingCategory.UpdatedBy = User.Identity.Name;
				_categoryService.UpdateCategory(existingCategory);
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
				UpdatedAt = category.UpdatedAt,
				Images = category.Images
			};
		}
	}
}
