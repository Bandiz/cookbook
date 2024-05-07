using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record CreateRecipeRequestModel(
	[property: Required][property: MinLength(2)] string Title,
	string Description,
	int PrepTimeMinutes,
	int CookTimeMinutes,
	int TotalTimeMinutes,
	string ImageUrl,
	List<string> Categories,
	List<CreateInstructionRequestModel> Instructions,
	List<CreateIngredientRequestModel> Ingredients);
