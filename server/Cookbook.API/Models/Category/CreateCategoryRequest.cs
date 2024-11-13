using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

public record CreateCategoryRequest(
	string CategoryName,
	bool Visible,
	string MainImage,
	List<string> Images,
	bool IsFeatured);
