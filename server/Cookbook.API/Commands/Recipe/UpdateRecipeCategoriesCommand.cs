using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MediatR;
using MongoDB.Driver;

namespace Cookbook.API.Commands.Recipe;

public record UpdateRecipeCategoriesCommand(Entities.Recipe Recipe) : 
	IRequest<CommandResponse>;

public class UpdateRecipeCategoriesCommandHandler(
	IDataAccess dataAccess) : 
	IRequestHandler<UpdateRecipeCategoriesCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UpdateRecipeCategoriesCommand command,
		CancellationToken cancellationToken)
	{
		var recipe = command.Recipe;
		var categoriesCollection = dataAccess.Categories;

		if (recipe.Categories.Count == 0)
		{
			return CommandResponse.Ok();
		}
		var filter = Builders<Entities.Category>
			.Filter
			.Where(x => recipe.Categories.Contains(x.CategoryName));
		var projection = Builders<Entities.Category>.Projection
			.Include(c => c.CategoryName);

		var categories = await categoriesCollection.FindAsync(
			filter,
			new() { Projection = projection },
			cancellationToken);

		var categoryNames = (await categories.ToListAsync(cancellationToken))
			.Select(x => x.CategoryName)
			.ToList();	

		var notAddedCategories = recipe.Categories.Where(x => !categoryNames.Contains(x)).ToList();

		if (notAddedCategories.Count == 0)
		{
			return CommandResponse.Ok();
		}

		await categoriesCollection.InsertManyAsync(notAddedCategories.Select(x => new Entities.Category()
		{
			CategoryName = x,
			CreatedBy = recipe.UpdatedBy ?? recipe.CreatedBy,
			CreatedAt = DateTime.UtcNow
		}), new(), cancellationToken);

		return CommandResponse.Ok();
	}
}
