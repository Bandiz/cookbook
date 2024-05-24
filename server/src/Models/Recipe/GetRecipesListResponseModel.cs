using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

public record GetRecipesListResponseModel(
	int Id,
	string Title,
	string CreatedBy,
	DateTime CreatedAt,
	string UpdatedBy,
	DateTime? UpdatedAt,
	IEnumerable<string> Categories,
	bool IsPublished);
