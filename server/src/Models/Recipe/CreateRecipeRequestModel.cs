using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record CreateRecipeRequestModel(
	[Required][MinLength(2)] string Title,
	string Description,
	int? PrepTimeMinutes,
	int? CookTimeMinutes,
	int? TotalTimeMinutes,
	string MainImage,
	List<string> Categories,
	List<CreateInstructionRequestModel> Instructions,
	List<CreateIngredientRequestModel> Ingredients);
