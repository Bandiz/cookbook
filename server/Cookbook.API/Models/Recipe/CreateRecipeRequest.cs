using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

public record CreateRecipeRequest(
	string Title,
	string Description,
	int? PrepTimeMinutes,
	int? CookTimeMinutes,
	int? TotalTimeMinutes,
	string MainImage,
	List<string> Categories,
	List<InstructionRequest> Instructions,
	List<IngredientRequest> Ingredients,
	bool IsPublished,
	bool IsFeatured
);
