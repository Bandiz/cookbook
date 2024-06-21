using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

#nullable enable
public record UpdateRecipeRequestModel(
	int? Id,
	string? Title,
	string? Description,
	int? PrepTimeMinutes,
	int? CookTimeMinutes,
	int? TotalTimeMinutes,
	string? MainImage,
	List<string>? Categories,
	List<IngredientRequestModel>? Ingredients,
	List<InstructionRequestModel>? Instructions,
	bool? IsPublished
	);
