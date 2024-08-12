using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Models.Recipe;
using Cookbook.API.Services.Interfaces;
using MediatR;

namespace Cookbook.API.Commands.Recipe;

public class CreateRecipeCommand : IRequest<CommandResponse>
{
	public CreateRecipeRequest Request { get; set; }
	public string User { get; set; }
}

public class CreateRecipeCommandHandler(IRecipeService recipeService) :
	IRequestHandler<CreateRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		CreateRecipeCommand command,
		CancellationToken cancellationToken)
	{
		var request = command.Request;
		var newRecipe = new Entities.Recipe
		{
			Title = request.Title,
			Description = request.Description,
			MainImage = request.MainImage,
			CookTimeMinutes = request.CookTimeMinutes ?? 0,
			PrepTimeMinutes = request.PrepTimeMinutes ?? 0,
			TotalTimeMinutes = request.TotalTimeMinutes ?? 0,
			Categories = request.Categories ?? [],
			Ingredients = request.Ingredients?.Select((x, index) => new Ingredient
			{
				Amount = x.Amount,
				MeasurementType = x.MeasurementType,
				Name = x.Name,
			}).ToList() ?? [],
			Instructions = request.Instructions?.Select(x => new Instruction
			{
				Description = x.Description,
			}).ToList() ?? [],
			IsPublished = request.IsPublished ?? false,
			CreatedBy = command.User,
			CreatedAt = DateTime.UtcNow
		};
		var recipe = await recipeService.CreateRecipe(newRecipe, cancellationToken);
		return CommandResponse.Ok(new GetRecipeResponse(recipe));
	}
}
