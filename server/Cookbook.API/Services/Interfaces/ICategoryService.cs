using Cookbook.API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cookbook.API.Services.Interfaces;

public interface ICategoryService
{
	Task<Category> GetCategory(string categoryName);

	Task<bool> CheckIfExists(string categoryName);

	List<Category> GetCategories(bool visible = true);

	Category CreateCategory(Category category);

	void DeleteCategory(string categoryName);

	List<Category> CreateCategories(List<Category> categories);

	Task UpdateCategory(Category category);

	Task<Dictionary<string, List<string>>> GetCategoryImages();
}
