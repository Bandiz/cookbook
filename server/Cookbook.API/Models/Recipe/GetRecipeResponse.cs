﻿using System;
using System.Collections.Generic;
using System.Linq;
using RecipeEntity = Cookbook.API.Entities.Recipe;

namespace Cookbook.API.Models.Recipe;

public record GetRecipeResponse(
	int Id,
	string Title,
	string Description,
	int PrepTimeMinutes,
	int CookTimeMinutes,
	int TotalTimeMinutes,
	string MainImage,
	IEnumerable<string> Categories,
	IEnumerable<InstructionResponse> Instructions,
	IEnumerable<IngredientResponse> Ingredients,
	bool IsPublished,
	bool IsFeatured,
	string CreatedBy,
	DateTime CreatedAt,
	string UpdatedBy,
	DateTime? UpdatedAt)
{
	public GetRecipeResponse(RecipeEntity recipe) : this(
		recipe.Id,
		recipe.Title,
		recipe.Description,
		recipe.PrepTimeMinutes,
		recipe.CookTimeMinutes,
		recipe.TotalTimeMinutes,
		recipe.MainImage,
		recipe.Categories,
		recipe.Instructions.Select(x => new InstructionResponse(x.Description)),
		recipe.Ingredients.Select(x => new IngredientResponse(x)),
		recipe.IsPublished,
		recipe.IsFeatured,
		recipe.CreatedBy,
		recipe.CreatedAt,
		recipe.UpdatedBy,
		recipe.UpdatedAt)
	{
	}
}
