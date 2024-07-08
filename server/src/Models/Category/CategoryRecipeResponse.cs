using System;

namespace Cookbook.API.Models.Category;

public record CategoryRecipeResponse(
	int Id,
	string Title,
	string CategoryName,
	string CreatedBy,
	DateTime CreatedAt,
	string UpdatedBy,
	DateTime? UpdatedAt);
