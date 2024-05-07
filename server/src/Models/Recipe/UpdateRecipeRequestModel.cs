using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record UpdateRecipeRequestModel(
	[property: MinLength(2)] string Title,
	string Description,
	int? PrepTimeMinutes,
	int? CookTimeMinutes,
	int? TotalTimeMinutes,
	string ImageUrl);
