using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Models.Recipe;
using Cookbook.API.Services.Interfaces;
using MediatR;
using MongoDB.Driver;

namespace Cookbook.API.Commands.Recipe;

public class CreateRecipeCommand : IRequest<CommandResponse>
{
	public CreateRecipeRequest Request { get; set; }
	public string User { get; set; }
}

public class CreateRecipeCommandHandler(IDataAccess dataAccess, IMediator mediator) :
	IRequestHandler<CreateRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		CreateRecipeCommand command,
		CancellationToken cancellationToken)
	{
		var recipeCollection = dataAccess.Recipes;
		var request = command.Request;
		var newRecipe = new Entities.Recipe
		{
			Id = GetNewRecipeId(),
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

		await recipeCollection.InsertOneAsync(newRecipe, new(), cancellationToken);

		await mediator.Send(
			new UpdateRecipeCategoriesCommand(newRecipe),
			cancellationToken);

		return CommandResponse.Ok(newRecipe);
	}

	private int GetNewRecipeId()
	{
		var counters = dataAccess.Counters;
		var update = Builders<Counter>.Update.Inc(x => x.Sequence, 1);
		return counters
			.FindOneAndUpdate(x => x.Id == nameof(Recipe).ToLower(), update)
			.Sequence;
	}
}
