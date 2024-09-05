using System.Collections.Generic;
using System.Threading.Tasks;
using Cookbook.API.Entities;

namespace Cookbook.API.Services.Interfaces;

public interface IRecipeQueries
{
	Recipe GetRecipe(int id);
	List<Recipe> GetRecipes(string text, int count, List<string> categories);
	Task<List<Recipe>> GetAllRecipes(List<string> categories = null);
}
