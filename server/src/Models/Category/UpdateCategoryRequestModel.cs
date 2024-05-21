using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

#nullable enable

public record UpdateCategoryRequestModel(
	bool? Visible,
	string? MainImage,
	List<string>? Images);
