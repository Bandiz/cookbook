using System.Collections.Generic;
using System.Linq;
using RecipeEntity = Cookbook.API.Entities.Recipe;

namespace Cookbook.API.Models.Recipe;

public record GetPublicRecipeResponse(
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
	bool IsFeatured)
{
	public GetPublicRecipeResponse(RecipeEntity recipe) : this(
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
		recipe.IsFeatured)
	{
	}
}
