using CategoryEntity = Cookbook.API.Entities.Category;

namespace Cookbook.API.Models.Category;

public record GetPublicCategoryResponse(
	string CategoryName,
	string MainImage,
	bool IsFeatured)
{
	public GetPublicCategoryResponse(CategoryEntity category) : this(
		category.CategoryName,
		category.MainImage,
		category.IsFeatured)
	{
	}
}
