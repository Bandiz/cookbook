using Cookbook.API.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Cookbook.API.Services.Interfaces;

public interface IRecipeService
{
	Recipe GetRecipe(int id);

	List<Recipe> GetRecipes(string text, int count, List<string> categories);

	Task<List<Recipe>> GetAllRecipes(List<string> categories = null);

	Task<Recipe> CreateRecipe(
		Recipe recipe,
		CancellationToken cancellationToken = default);

	Task UpdateRecipe(Recipe recipe, CancellationToken cancellationToken = default);

	Task DeleteRecipe(int id, CancellationToken cancellationToken = default);

	Task RemoveCategoryAll(
		string categoryName,
		CancellationToken cancellationToken = default);
}
