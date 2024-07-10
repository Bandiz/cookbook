using Cookbook.API.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Cookbook.API.Services.Interfaces;

public interface ICategoryService
{
	Task<Category> GetCategory(string categoryName);

	Task<bool> CheckIfExists(string categoryName);

	List<Category> GetCategories(bool visible = true);

	Category CreateCategory(Category category);

	void DeleteCategory(string categoryName);

	Task<List<Category>> CreateCategories(
		List<Category> categories,
		CancellationToken cancellationToken = default);

	Task UpdateCategory(Category category);

	Task<Dictionary<string, List<string>>> GetCategoryImages();
}
