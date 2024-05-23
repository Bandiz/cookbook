using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

#nullable enable
public record UpdateRecipeRequestModel(
	[MinLength(2)] string? Title,
	string? Description,
	int? PrepTimeMinutes,
	int? CookTimeMinutes,
	int? TotalTimeMinutes,
	string? MainImage,
	List<string>? Categories,
	List<IngredientRequestModel>? Ingredients,
	List<InstructionRequestModel>? Instructions
	);
