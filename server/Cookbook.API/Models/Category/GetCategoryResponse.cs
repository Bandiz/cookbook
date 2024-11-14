using System;
using System.Collections.Generic;
using CategoryEntity = Cookbook.API.Entities.Category;

namespace Cookbook.API.Models.Category;

public record GetCategoryResponse(
	string CategoryName,
	bool Visible,
	string UpdatedBy,
	DateTime? UpdatedAt,
	string CreatedBy,
	DateTime CreatedAt,
	List<string> Images,
	string MainImage,
	bool IsFeatured)
{
	public GetCategoryResponse(CategoryEntity category) : this(
		category.CategoryName,
		category.Visible,
		category.UpdatedBy,
		category.UpdatedAt,
		category.CreatedBy,
		category.CreatedAt,
		category.Images,
		category.MainImage,
		category.IsFeatured)
	{
	}
}
