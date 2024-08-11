using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MediatR;

namespace Cookbook.API.Commands.Recipe;

public class DeleteRecipeCommand : IRequest<CommandResponse>
{
	public int Id { get; set; }
}

public class DeleteRecipeCommandHandler(IRecipeService recipeService) : 
IRequestHandler<DeleteRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(DeleteRecipeCommand command, CancellationToken cancellationToken)
	{
		var recipe = recipeService.GetRecipe(command.Id);
		if (recipe == null)
		{
			return new NotFoundResponse("Recipe not found");
		}
		await recipeService.DeleteRecipe(command.Id, cancellationToken);
		return new SuccessResponse();
	}
}
