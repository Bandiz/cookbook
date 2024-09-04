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
	Task DeleteCategory(
		string categoryName,
		CancellationToken cancellationToken = default);
	Task<List<Category>> CreateCategories(
		List<Category> categories,
		CancellationToken cancellationToken = default);
	Task UpdateCategory(
		Category category,
		CancellationToken cancellationToken = default);
	Task<Dictionary<string, List<string>>> GetCategoryImages();
}
