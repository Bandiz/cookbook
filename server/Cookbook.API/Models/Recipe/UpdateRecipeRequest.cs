using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

#nullable enable
public record UpdateRecipeRequest(
	string? Title,
	string? Description,
	int? PrepTimeMinutes,
	int? CookTimeMinutes,
	int? TotalTimeMinutes,
	string? MainImage,
	List<string>? Categories,
	List<IngredientRequest>? Ingredients,
	List<InstructionRequest>? Instructions,
	bool? IsPublished,
	bool? IsFeatured
	);
