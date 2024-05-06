using System;
using System.Collections.Generic;
using CategoryEntity = Cookbook.API.Entities.Category;

namespace Cookbook.API.Models.Category;

public record CategoryDetailsResponseModel : CategoryResponseModel
{
	public CategoryDetailsResponseModel(
		CategoryEntity Category,
		List<CategoryRecipeResponseModel> Recipes) : base(
			Category.CategoryName,
			Category.Visible,
			Category.UpdatedBy,
			Category.UpdatedAt,
			Category.CreatedBy,
			Category.CreatedAt,
			Category.Images,
			Category.MainImage) => this.Recipes = Recipes;

	public CategoryDetailsResponseModel(
		string CategoryName,
		bool Visible,
		string UpdatedBy,
		DateTime? UpdatedAt,
		string CreatedBy,
		DateTime CreatedAt,
		List<string> Images,
		string MainImage,
		List<CategoryRecipeResponseModel> Recipes) : base(
			CategoryName,
			Visible,
			UpdatedBy,
			UpdatedAt,
			CreatedBy,
			CreatedAt,
			Images,
			MainImage) => this.Recipes = Recipes;

	public List<CategoryRecipeResponseModel> Recipes { get; }
}
