using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MediatR;
using MongoDB.Driver;

namespace Cookbook.API.Commands.Recipe;

public class DeleteRecipeCommand : IRequest<CommandResponse>
{
	public int Id { get; set; }
}

public class DeleteRecipeCommandHandler(
	IRecipeQueries recipeQueries, 
	IDataAccess dataAccess) : 
IRequestHandler<DeleteRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(DeleteRecipeCommand command, CancellationToken cancellationToken)
	{
		var recipe = recipeQueries.GetRecipe(command.Id);
		if (recipe == null)
		{
			return CommandResponse.NotFound("Recipe not found");
		}

		await dataAccess.Recipes.DeleteOneAsync(
			x => x.Id == command.Id, 
			cancellationToken);

		return CommandResponse.Ok();
	}
}
