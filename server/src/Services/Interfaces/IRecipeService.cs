using Cookbook.API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cookbook.API.Services.Interfaces;

public interface IRecipeService
{
	Recipe GetRecipe(int id);

	List<Recipe> GetRecipes(string text, int count, List<string> categories);

	Task<List<Recipe>> GetAllRecipes(List<string> categories = null);

	Recipe CreateRecipe(Recipe recipe);

	void UpdateRecipe(Recipe recipe);

	void DeleteRecipe(int id);

	void RemoveCategoryAll(string categoryName);
}
