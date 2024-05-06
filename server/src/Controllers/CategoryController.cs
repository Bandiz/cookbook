using System;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
			var categories = _categoryService
				.GetCategories()
				.Select(x => x.CategoryName);
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
		[HttpGet("{categoryName}/recipes")]
		public IActionResult GetCategoryDetails(string categoryName)
		{
			var category = _categoryService.GetCategory(categoryName);

			if (category == null)
			{
				return NotFound(categoryName);
			}
			var recipes = _recipeService.GetRecipes(null, 0, [categoryName]);

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
				CreatedAt = DateTime.UtcNow
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
		[HttpPut("{categoryName}")]
		public async Task<IActionResult> UpdateCategory(
			string categoryName,
			[FromBody] UpdateCategoryRequestModel model)
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

			var updated = false;

			if (model.Visible.HasValue && existingCategory.Visible != model.Visible)
			{
				existingCategory.Visible = model.Visible.Value;
				updated = true;
			}

			if (!string.IsNullOrEmpty(model.MainImage))
			{
				var missingIds = await _imageService.CheckExistingImages([model.MainImage]);

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
				_categoryService.UpdateCategory(existingCategory);
			}

			return Ok(MapCategoryResponse(existingCategory));
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
			var existingCategory = _categoryService.GetCategory(categoryName);

			if (existingCategory == null)
			{
				return NotFound(categoryName);
			}

			var missingIds = await _imageService.CheckExistingImages(model.ImageIds);

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
				_categoryService.UpdateCategory(existingCategory);
			}

			return Ok(MapCategoryResponse(existingCategory));
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

			var existingCategory = _categoryService.GetCategory(categoryName);

			if (existingCategory == null)
			{
				return NotFound(categoryName);
			}

			if (model.ImageIds.Count == 0)
			{
				return Ok(MapCategoryResponse(existingCategory));
			}

			var imagesBefore = existingCategory.Images.Count;

			existingCategory.Images.RemoveAll(model.ImageIds.Contains);

			if (imagesBefore != existingCategory.Images.Count)
			{
				existingCategory.UpdatedAt = DateTime.UtcNow;
				existingCategory.UpdatedBy = User.Identity.Name;
				_categoryService.UpdateCategory(existingCategory);
			}

			return Ok(MapCategoryResponse(existingCategory));
		}

		private static CategoryResponseModel MapCategoryResponse(Category category) => new CategoryResponseModel(
				category.CategoryName,
				category.Visible,
				category.UpdatedBy,
				category.UpdatedAt,
				category.CreatedBy,
				category.CreatedAt,
				category.Images,
				category.MainImage);
	}
}
