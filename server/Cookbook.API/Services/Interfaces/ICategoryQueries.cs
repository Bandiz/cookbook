using System.Collections.Generic;
using System.Threading.Tasks;
using Cookbook.API.Entities;

namespace Cookbook.API.Services.Interfaces;

public interface ICategoryQueries
{
	Task<Category> GetCategory(string categoryName);
	Task<bool> CheckIfExists(string categoryName);
	List<Category> GetCategories(bool visible = true);
	Task<Dictionary<string, List<string>>> GetCategoryImages();
}
