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
	public IActionResult GetRecipes(string searchText, [FromQuery] List<string> categories, int count)
	{
		var recipes = recipeService.GetRecipes(searchText, count, categories);
		return Ok(recipes.Select(recipe => new GetRecipesResponseModel(
			recipe.Id,
			recipe.Title,
			recipe.TotalTimeMinutes,
			recipe.ImageUrl,
			recipe.Categories)));
	}

	[Authorize(Roles = "Admin")]
	[HttpPost]
	public IActionResult CreateRecipe([FromForm] CreateRecipeRequestModel model)
	{
		if (model == null)
		{
			return NotFound(ModelState);
		}

		var recipe = new Recipe
		{
			Title = model.Title,
			Description = model.Description,
			ImageUrl = model.ImageUrl,
			CookTimeMinutes = model.CookTimeMinutes,
			PrepTimeMinutes = model.PrepTimeMinutes,
			TotalTimeMinutes = model.TotalTimeMinutes,
			Categories = model.Categories,
			Ingredients = model.Ingredients.Select((x, index) => new Ingredient
			{
				Id = index + 1,
				Amount = x.Amount,
				MeasurementType = x.MeasurementType,
				Name = x.Name,
				Position = x.Position,
			}).ToList(),
			Instructions = model.Instructions.Select(x => new Instruction
			{
				Description = x.Description,
				Position = x.Position,
			}).ToList(),
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
	public IActionResult UpdateRecipe(int id, UpdateRecipeRequestModel model)
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

		if (!string.IsNullOrEmpty(model.ImageUrl))
		{
			updated = true;
			recipe.ImageUrl = model.ImageUrl;
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

		if (updated)
		{
			recipe.UpdatedBy = User.Identity.Name;
			recipe.UpdatedAt = DateTime.UtcNow;
			recipeService.UpdateRecipe(recipe);
		}


		return Ok(new GetRecipeResponseModel(recipe));
	}

	[Authorize(Roles = "Admin")]
	[HttpPut("{id:int}/category/{category}")]
	public IActionResult AddToCategory(int id, string category)
	{
		var recipe = recipeService.GetRecipe(id);
		if (recipe == null)
		{
			return NotFound(id);
		}

		var updated = false;

		if (!recipe.Categories.Contains(category))
		{
			updated = true;
			recipe.Categories.Add(category);
		}

		if (updated)
		{
			recipe.UpdatedBy = User.Identity.Name;
			recipe.UpdatedAt = DateTime.UtcNow;
			recipeService.UpdateRecipe(recipe);
		}

		return Ok(new UpdateCategoriesResponse(new List<string>(recipe.Categories), default, default));
	}


	[Authorize(Roles = "Admin")]
	[HttpDelete("{id:int}/category/{category}")]
	public IActionResult RemoveFromCategory(int id, string category)
	{
		var recipe = recipeService.GetRecipe(id);
		if (recipe == null)
		{
			return NotFound(id);
		}


		if (!recipe.Categories.Contains(category))
		{
			return NotFound(category);
		}

		recipe.Categories.Remove(category);

		recipe.UpdatedBy = User.Identity.Name;
		recipe.UpdatedAt = DateTime.UtcNow;
		recipeService.UpdateRecipe(recipe);

		return Ok(new UpdateCategoriesResponse(new List<string>(recipe.Categories), recipe.UpdatedBy, recipe.UpdatedAt.Value));
	}

	[Authorize(Roles = "Admin")]
	[HttpPost("{recipeId:int}/ingredient")]
	public IActionResult CreateIngredient(int recipeId, CreateIngredientRequestModel model)
	{
		if (model == null)
		{
			return NotFound(ModelState);
		}

		var recipe = recipeService.GetRecipe(recipeId);
		if (recipe == null)
		{
			return NotFound(recipeId);
		}

		var elementAt = recipe.Ingredients.ElementAtOrDefault(model.Position);

		var newIngredient = new Ingredient()
		{
			Id = recipe.Ingredients.Count + 1,
			Name = model.Name,
			Amount = model.Amount,
			MeasurementType = model.MeasurementType,
			Position = elementAt == null ? recipe.Ingredients.Count : model.Position
		};

		if (elementAt == null)
		{
			recipe.Ingredients.Add(newIngredient);
		}
		else
		{
			foreach (var ingredient in recipe.Ingredients.Where(x => x.Position >= model.Position))
			{
				ingredient.Position++;
			}
			recipe.Ingredients.Add(newIngredient);

		}

		recipe.UpdatedBy = User.Identity.Name;
		recipe.UpdatedAt = DateTime.UtcNow;

		recipeService.UpdateRecipe(recipe);

		return Ok(recipe.Ingredients.OrderBy(x => x.Position).Select(x => new IngredientResponseModel(x)));
	}


	[Authorize(Roles = "Admin")]
	[HttpDelete("{recipeId:int}/ingredient/{ingredientId:int}")]
	public IActionResult DeleteIngredient(int recipeId, int ingredientId)
	{
		var recipe = recipeService.GetRecipe(recipeId);
		if (recipe == null)
		{
			return NotFound(recipeId);
		}

		var element = recipe.Ingredients.SingleOrDefault(x => x.Id == ingredientId);


		if (element == null)
		{
			return NotFound(ingredientId);
		}

		recipe.Ingredients.Remove(element);

		foreach (var (ingredient, index) in recipe.Ingredients.OrderBy(x => x.Position).Select((x, i) => (x, i)))
		{
			ingredient.Position = index;
		}

		recipe.UpdatedBy = User.Identity.Name;
		recipe.UpdatedAt = DateTime.UtcNow;

		recipeService.UpdateRecipe(recipe);

		return Ok(recipe.Ingredients.OrderBy(x => x.Position).Select(x => new IngredientResponseModel(x)));
	}

}
