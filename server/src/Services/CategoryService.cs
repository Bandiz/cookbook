using Cookbook.API.Configuration;
using Cookbook.API.Entities;
using Cookbook.API.Services.Interfaces;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Cookbook.API.Services;

public class CategoryService : ICategoryService
{
	private readonly IMongoCollection<Category> _categories;

	public CategoryService(CookbookDatabaseSettings settings, IMongoClient mongoClient)
	{
		var cookbookDb = mongoClient.GetDatabase(settings.DatabaseName);
		_categories = cookbookDb.GetCollection<Category>("categories");
	}

	public Category GetCategory(string categoryName)
	{
		return _categories
			.Find(x => x.CategoryName == categoryName)
			.SingleOrDefault();
	}

	public List<Category> GetCategories(bool visible = true)
	{
		var filter = Builders<Category>.Filter;
		return _categories
			.Find(visible ? filter.Where(x => x.Visible) : filter.Empty)
			.ToList();
	}

	public Category CreateCategory(Category category)
	{
		_categories.InsertOne(category);

		return category;
	}

	public void DeleteCategory(string categoryName)
	{
		_categories.DeleteOne(x => x.CategoryName == categoryName);
	}

	public List<Category> CreateCategories(List<Category> categories)
	{
		_categories.InsertMany(categories);

		return categories;
	}

	public void UpdateCategory(Category category)
	{
		_categories.ReplaceOne(x => x.CategoryName == category.CategoryName, category);
	}
}
