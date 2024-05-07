using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

public record GetRecipesResponseModel(
	int Id,
	string Title,
	int TotalTimeMinutes,
	string ImageUrl,
	IEnumerable<string> Categories);
