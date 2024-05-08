using System;
using System.Collections.Generic;
using CategoryEntity = Cookbook.API.Entities.Category;

namespace Cookbook.API.Models.Category;

public record CategoryResponseModel(
	string CategoryName,
	bool Visible,
	string UpdatedBy,
	DateTime? UpdatedAt,
	string CreatedBy,
	DateTime CreatedAt,
	List<string> Images,
	string MainImage)
{
	public CategoryResponseModel(CategoryEntity category) : this(
		category.CategoryName,
		category.Visible,
		category.UpdatedBy,
		category.UpdatedAt,
		category.CreatedBy,
		category.CreatedAt,
		category.Images,
		category.MainImage)
	{
	}
}
