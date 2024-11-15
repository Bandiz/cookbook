using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

public record GetPublicRecipesResponse(
	int Id,
	string Title,
	int TotalTimeMinutes,
	string MainImage,
	IEnumerable<string> Categories,
	bool IsFeatured);
