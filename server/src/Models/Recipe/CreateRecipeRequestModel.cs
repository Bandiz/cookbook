using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

public record CreateRecipeRequestModel(
	string Title,
	string Description,
	int? PrepTimeMinutes,
	int? CookTimeMinutes,
	int? TotalTimeMinutes,
	string MainImage,
	List<string> Categories,
	List<CreateInstructionRequestModel> Instructions,
	List<CreateIngredientRequestModel> Ingredients,
	bool? IsPublished
	);
