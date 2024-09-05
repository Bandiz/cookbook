using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MediatR;
using MongoDB.Driver;

namespace Cookbook.API.Commands.Category;

public class DeleteCategoryCommand : IRequest<CommandResponse>
{
	public string CategoryName { get; set; }
}

public class DeleteCategoryCommandHandler(
	IDataAccess dataAccess,
	ICategoryService categoryService) : 
	IRequestHandler<DeleteCategoryCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		DeleteCategoryCommand request, 
		CancellationToken cancellationToken)
	{
		var categoryName = request.CategoryName;

		if (string.IsNullOrEmpty(categoryName))
		{
			return CommandResponse.BadRequest("Category name required");
		}
		var existingCategory = categoryService.GetCategory(categoryName);

		if (existingCategory == null)
		{
			return CommandResponse.NotFound(categoryName);
		}

		// TODO: create admin warnings
		var recipeCollection = dataAccess.Recipes;
		var recipesCursor = await recipeCollection
			.FindAsync(
				x => x.Categories.Contains(categoryName),
				cancellationToken: cancellationToken);
		var recipes = recipesCursor.ToList(cancellationToken);

		foreach (var recipe in recipes)
		{
			recipe.Categories.Remove(categoryName);
			await recipeCollection.ReplaceOneAsync(
				x => x.Id == recipe.Id,
				recipe,
				cancellationToken: cancellationToken);
		}

		await dataAccess.Categories.DeleteOneAsync(
			x => x.CategoryName == categoryName,
			cancellationToken: cancellationToken);

		return CommandResponse.Ok();
	}
}
