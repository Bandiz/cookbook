using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Services.Interfaces;
using MongoDB.Driver;

namespace Cookbook.API.Services;

public class RecipeService(
	IDataAccess DataAccess,
	ICategoryService categoryService) : IRecipeService
{
	private readonly IMongoCollection<Counter> _counters = DataAccess.Counters;
	private readonly IMongoCollection<Recipe> _recipes = DataAccess.Recipes;
	private readonly ICategoryService categoryService = categoryService;

	public Recipe GetRecipe(int id)
	{
		return _recipes.Find(x => x.Id == id).SingleOrDefault();
	}

	public List<Recipe> GetRecipes(string text, int count, List<string> categories)
	{
		var filter = Builders<Recipe>.Filter.Where(x => x.IsPublished);

		if (!string.IsNullOrEmpty(text))
		{
			var textFilter = Builders<Recipe>.Filter.Text(text, new TextSearchOptions()
			{
				CaseSensitive = false
			});
			filter = Builders<Recipe>.Filter.And(filter, textFilter);
		}

		if (categories != null && categories.Count > 0)
		{
			var categoryFilter = Builders<Recipe>.Filter.AnyIn(
				recipe => recipe.Categories,
				categories);
			filter = Builders<Recipe>.Filter.And(filter, categoryFilter);
		}

		var query = _recipes.Find(filter).SortByDescending(x => x.CreatedAt);

		if (count > 0)
		{
			return query.Limit(count).ToList();
		}

		return query.ToList();
	}

	public async Task<List<Recipe>> GetAllRecipes(List<string> categories = null)
	{
		var filter = Builders<Recipe>.Filter.Empty;

		if (categories != null)
		{
			Builders<Recipe>.Filter.And(
				filter,
				Builders<Recipe>.Filter.AnyIn(recipe => recipe.Categories, categories));
		}

		var query = await _recipes.FindAsync(filter, new()
		{
			Sort = Builders<Recipe>.Sort.Descending(x => x.CreatedAt)
		});

		return query.ToList();
	}

	public async Task DeleteRecipe(
		int id,
		CancellationToken cancellationToken = default)
	{
		await _recipes.DeleteOneAsync(x => x.Id == id, cancellationToken);
	}

	public async Task RemoveCategoryAll(
		string categoryName,
		CancellationToken cancellationToken = default)
	{
		var recipesCursor = await _recipes.FindAsync(
			x => x.Categories.Contains(categoryName),
			cancellationToken: cancellationToken);
		var recipes = recipesCursor.ToList(cancellationToken);

		foreach (var recipe in recipes)
		{
			recipe.Categories.Remove(categoryName);
			await _recipes.ReplaceOneAsync(
				x => x.Id == recipe.Id,
				recipe,
				cancellationToken: cancellationToken);
		}
	}
