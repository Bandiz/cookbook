using System.Collections.Generic;
using System.Linq;
using RecipeEntity = Cookbook.API.Entities.Recipe;

namespace Cookbook.API.Models.Recipe;

public record GetRecipeResponseModel(
	int Id,
	string Title,
	string Description,
	int PrepTimeMinutes,
	int CookTimeMinutes,
	int TotalTimeMinutes,
	string MainImage,
	IEnumerable<string> Categories,
	IEnumerable<InstructionResponseModel> Instructions,
	IEnumerable<IngredientResponseModel> Ingredients)
{
	public GetRecipeResponseModel(RecipeEntity recipe) : this(
		recipe.Id,
		recipe.Title,
		recipe.Description,
		recipe.PrepTimeMinutes,
		recipe.CookTimeMinutes,
		recipe.TotalTimeMinutes,
		recipe.MainImage,
		recipe.Categories,
		recipe.Instructions.Select(x => new InstructionResponseModel(x.Description)),
		recipe.Ingredients.Select(x => new IngredientResponseModel(x)))
	{
	}
}
