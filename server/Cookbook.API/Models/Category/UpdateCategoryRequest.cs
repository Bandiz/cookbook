using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

#nullable enable

public record UpdateCategoryRequest(
	bool? Visible,
	string? MainImage,
	List<string>? Images,
	bool? IsFeatured);
