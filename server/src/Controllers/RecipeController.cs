using Cookbook.API.Entities;
using Cookbook.API.Models.Recipe;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cookbook.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class RecipeController(IRecipeService recipeService) : ControllerBase
{
	[AllowAnonymous]
	[HttpGet("{id:int}")]
	public IActionResult GetRecipe(int id)
	{
		var recipe = recipeService.GetRecipe(id);

		if (recipe == null)
		{
			return NotFound(id);
		}
		return Ok(new GetRecipeResponseModel(recipe));
	}

	[AllowAnonymous]
	[HttpGet]
	public IActionResult GetRecipes(
		string searchText,
		[FromQuery] List<string> categories,
		int count)
	{
		var recipes = recipeService.GetRecipes(searchText, count, categories);
		return Ok(recipes.Select(recipe => new GetRecipesResponseModel(
			recipe.Id,
			recipe.Title,
			recipe.TotalTimeMinutes,
			recipe.MainImage,
			recipe.Categories,
			recipe.IsPublished)));
	}

	[Authorize(Roles = "Admin")]
	[HttpPost]
	public IActionResult CreateRecipe([FromBody] CreateRecipeRequestModel model)
	{
		if (model == null)
		{
			return NotFound(ModelState);
		}

		var recipe = new Recipe
		{
			Title = model.Title,
			Description = model.Description,
			MainImage = model.MainImage,
			CookTimeMinutes = model.CookTimeMinutes ?? 0,
			PrepTimeMinutes = model.PrepTimeMinutes ?? 0,
			TotalTimeMinutes = model.TotalTimeMinutes ?? 0,
			Categories = model.Categories ?? [],
			Ingredients = model.Ingredients?.Select((x, index) => new Ingredient
			{
				Amount = x.Amount,
				MeasurementType = x.MeasurementType,
				Name = x.Name,
			}).ToList() ?? [],
			Instructions = model.Instructions?.Select(x => new Instruction
			{
				Description = x.Description,
			}).ToList() ?? [],
			IsPublished = model.IsPublished ?? false,
			CreatedBy = User.Identity.Name,
			CreatedAt = DateTime.UtcNow
		};
		recipeService.CreateRecipe(recipe);

		return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, new GetRecipeResponseModel(recipe));
	}

	[Authorize(Roles = "Admin")]
	[HttpDelete("{id:int}")]
	public IActionResult DeleteRecipe(int id)
	{
		var recipe = recipeService.GetRecipe(id);
		if (recipe == null)
		{
			return NotFound(id);
		}

		recipeService.DeleteRecipe(id);

		return Ok();
	}

	[Authorize(Roles = "Admin")]
	[HttpPatch("{id:int}")]
	public IActionResult UpdateRecipe(int id, [FromBody] UpdateRecipeRequestModel model)
	{
		if (model == null)
		{
			return NotFound(ModelState);
		}

		var recipe = recipeService.GetRecipe(id);
		if (recipe == null)
		{
			return NotFound(id);
		}

		var updated = false;

		if (!string.IsNullOrEmpty(model.Title))
		{
			updated = true;
			recipe.Title = model.Title;
		}

		if (!string.IsNullOrEmpty(model.Description))
		{
			updated = true;
			recipe.Description = model.Description;
		}

		if (!string.IsNullOrEmpty(model.MainImage))
		{
			updated = true;
			recipe.MainImage = model.MainImage;
		}

		if (model.PrepTimeMinutes.HasValue)
		{
			updated = true;
			recipe.PrepTimeMinutes = model.PrepTimeMinutes.Value;
		}

		if (model.CookTimeMinutes.HasValue)
		{
			updated = true;
			recipe.CookTimeMinutes = model.CookTimeMinutes.Value;
		}

		if (model.TotalTimeMinutes.HasValue)
		{
			updated = true;
			recipe.TotalTimeMinutes = model.TotalTimeMinutes.Value;
		}

		if (model.Categories != null)
		{
			updated = true;
			recipe.Categories = model.Categories;
		}

		if (model.Ingredients != null)
		{
			updated = true;
			recipe.Ingredients = model.Ingredients.Select((x, index) => new Ingredient
			{
				Amount = x.Amount,
				MeasurementType = x.MeasurementType,
				Name = x.Name,
			}).ToList();		
		}

		if (model.Instructions != null)
		{
			updated = true;
			recipe.Instructions = model.Instructions.Select(x => new Instruction
			{
				Description = x.Description,
			}).ToList();
		}

		if (model.IsPublished.HasValue && recipe.IsPublished != model.IsPublished)
		{
			updated = true;
			recipe.IsPublished = model.IsPublished.Value;
		}

		if (updated)
		{
			recipe.UpdatedBy = User.Identity.Name;
			recipe.UpdatedAt = DateTime.UtcNow;
			recipeService.UpdateRecipe(recipe);
		}

		return Ok(new GetRecipeResponseModel(recipe));
	}
}
