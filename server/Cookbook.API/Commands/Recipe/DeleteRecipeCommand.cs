using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using Cookbook.API.Validators.Recipe;
using MediatR;
using MongoDB.Driver;

namespace Cookbook.API.Commands.Recipe;

public record DeleteRecipeCommand(int Id) : IRequest<CommandResponse>;

public class DeleteRecipeCommandHandler(
	IRecipeQueries recipeQueries,
	IDataAccess dataAccess,
	DeleteRecipeCommandValidator validator) 
	: IRequestHandler<DeleteRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(DeleteRecipeCommand command, CancellationToken cancellationToken)
	{
		var result = validator.Validate(command);

		if (!result.IsValid)
		{
			return CommandResponse.Invalid(result);
		}

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
