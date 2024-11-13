using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

public record GetRecipesListResponse(
	int Id,
	string Title,
	string CreatedBy,
	DateTime CreatedAt,
	string UpdatedBy,
	DateTime? UpdatedAt,
	IEnumerable<string> Categories,
	bool IsPublished,
	bool IsFeatured);
