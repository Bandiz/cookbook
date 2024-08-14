using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Services.Interfaces;
using MongoDB.Driver;

namespace Cookbook.API.Services;

public class CategoryService(IDataAccess dataAccess) : ICategoryService
{
	private readonly IMongoCollection<Category> _categories = dataAccess.Categories;

	public async Task<Category> GetCategory(string categoryName)
	{
		var normalizedName = categoryName
			.Trim()
			.ToLower()
			.CapitalizeFirstLetter();
		var category = await _categories
			.Find(x => x.CategoryName == normalizedName)
			.FirstOrDefaultAsync();
		return category;
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

	public async Task DeleteCategory(
		string categoryName,
		CancellationToken cancellationToken = default)
	{
		await _categories.DeleteOneAsync(
			x => x.CategoryName == categoryName,
			cancellationToken: cancellationToken);
	}

	public async Task<List<Category>> CreateCategories(
		List<Category> categories,
		CancellationToken cancellationToken = default)
	{
		await _categories.InsertManyAsync(categories, new(), cancellationToken);

		return categories;
	}

	public async Task UpdateCategory(
		Category category, 
		CancellationToken cancellationToken = default)
	{
		await _categories.ReplaceOneAsync(
			x => x.CategoryName == category.CategoryName,
			category,
			cancellationToken: cancellationToken);
	}

	public async Task<bool> CheckIfExists(string categoryName)
	{
		var filter = Builders<Category>.Filter.Eq("_id", categoryName);
		var count = await _categories.CountDocumentsAsync(filter);

		return count > 0;
	}

	public async Task<Dictionary<string, List<string>>> GetCategoryImages()
	{
		var result = new Dictionary<string, List<string>>();
		var filter = Builders<Category>.Filter.Where(x => x.Images != null && x.Images.Count > 0);
		var projection = Builders<Category>.Projection
			.Include(c => c.CategoryName)
			.Include(c => c.Images);

		var cursor = await _categories.FindAsync(filter, new() { Projection = projection });

		await cursor.ForEachAsync(document =>
		{
			result.Add(document.CategoryName, document.Images);
		});

		return result;
	}
}
