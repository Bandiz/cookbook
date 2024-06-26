﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Services.Interfaces;
using MongoDB.Driver;

namespace Cookbook.API.Services;

public class RecipeService(IDataAccess DataAccess, ICategoryService categoryService) : IRecipeService
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
			var categoryFilter = Builders<Recipe>.Filter.AnyIn(recipe => recipe.Categories, categories);
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
			Builders<Recipe>.Filter.And(filter, Builders<Recipe>.Filter.AnyIn(recipe => recipe.Categories, categories));
		}

		var query = await _recipes.FindAsync(filter, new()
		{
			Sort = Builders<Recipe>.Sort.Descending(x => x.CreatedAt)
		});

		return query.ToList();
	}

	public Recipe CreateRecipe(Recipe recipe)
	{
		var newId = GetNewRecipeId();
		recipe.Id = newId;

		_recipes.InsertOne(recipe);

		UpdateCategories(recipe);

		return recipe;
	}

	public async Task UpdateRecipe(Recipe recipe)
	{
		await _recipes.ReplaceOneAsync(x => x.Id == recipe.Id, recipe);
		UpdateCategories(recipe);
	}

	public void DeleteRecipe(int id)
	{
		_recipes.DeleteOne(x => x.Id == id);
	}

	public void RemoveCategoryAll(string categoryName)
	{
		var recipes = _recipes.Find(x => x.Categories.Contains(categoryName)).ToList();

		foreach (var recipe in recipes)
		{
			recipe.Categories.Remove(categoryName);
			_recipes.ReplaceOneAsync(x => x.Id == recipe.Id, recipe);
		}

	}

	private int GetNewRecipeId()
	{
		var update = Builders<Counter>.Update.Inc(x => x.Sequence, 1);
		return _counters
			.FindOneAndUpdate(x => x.Id == nameof(Recipe).ToLower(), update)
			.Sequence;
	}

	private void UpdateCategories(Recipe recipe)
	{
		if (recipe.Categories.Count > 0)
		{
			var categories = categoryService.GetCategories().Select(x => x.CategoryName).ToList();
			var notAddedCategories = recipe.Categories.Where(x => !categories.Contains(x)).ToList();

			if (notAddedCategories.Count == 0)
			{
				return;
			}

			categoryService.CreateCategories(notAddedCategories.Select(x => new Category()
			{
				CategoryName = x,
				CreatedBy = recipe.UpdatedBy ?? recipe.CreatedBy,
				CreatedAt = DateTime.UtcNow
			}).ToList());
		}
	}
}
