using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Models.Recipe;
using Cookbook.API.Services.Interfaces;
using MediatR;
using MongoDB.Driver;

namespace Cookbook.API.Commands.Recipe;

public class UpdateRecipeCommand : IRequest<CommandResponse>
{
	public int Id { get; set; }
	public UpdateRecipeRequest Request { get; set; }
	public string User { get; set; }
}

public class UpdateRecipeCommandHandler(
	IDataAccess dataAccess,
	IMediator mediator,
	IRecipeQueries recipeQueries) 
	: IRequestHandler<UpdateRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UpdateRecipeCommand command,
		CancellationToken cancellationToken)
	{
		var recipe = recipeQueries.GetRecipe(command.Id);
		if (recipe == null)
		{
			return CommandResponse.NotFound("Recipe not found");
		}
		var model = command.Request;

		var updated = false;

		if (!string.IsNullOrEmpty(model.Title) && recipe.Title != model.Title)
		{
			updated = true;
			recipe.Title = model.Title;
		}

		if (recipe.Description != model.Description)
		{
			updated = true;
			recipe.Description = model.Description;
		}

		if (recipe.MainImage != model.MainImage)
		{
			updated = true;
			recipe.MainImage = model.MainImage;
		}

		if (model.PrepTimeMinutes.HasValue && model.PrepTimeMinutes != recipe.PrepTimeMinutes)
		{
			updated = true;
			recipe.PrepTimeMinutes = model.PrepTimeMinutes.Value;
		}

		if (model.CookTimeMinutes.HasValue && model.CookTimeMinutes != recipe.CookTimeMinutes)
		{
			updated = true;
			recipe.CookTimeMinutes = model.CookTimeMinutes.Value;
		}

		if (model.TotalTimeMinutes.HasValue && model.TotalTimeMinutes != recipe.TotalTimeMinutes)
		{
			updated = true;
			recipe.TotalTimeMinutes = model.TotalTimeMinutes.Value;
		}

		if (model.Categories != null)
		{
			updated = true;
			recipe.Categories = model.Categories.ConvertAll(x => x
				.ToLower()
				.Trim()
				.CapitalizeFirstLetter());
		}

		if (model.Ingredients != null)
		{
			updated = true;
			recipe.Ingredients = model.Ingredients.Select((x, index) => new Ingredient
			{
				Amount = x.Amount,
				MeasurementType = x.MeasurementType,
				Name = x.Name,
			}).ToList();
		}

		if (model.Instructions != null)
		{
			updated = true;
			recipe.Instructions = model.Instructions.Select(x => new Instruction
			{
				Description = x.Description,
			}).ToList();
		}

		if (model.IsPublished.HasValue && recipe.IsPublished != model.IsPublished)
		{
			updated = true;
			recipe.IsPublished = model.IsPublished.Value;
		}

		if (updated)
		{
			recipe.UpdatedBy = command.User;
			recipe.UpdatedAt = DateTime.UtcNow;

			var recipesCollection = dataAccess.Recipes;

			await recipesCollection.ReplaceOneAsync(
				x => x.Id == recipe.Id,
				recipe,
				cancellationToken: cancellationToken);

			await mediator.Send(
				new UpdateRecipeCategoriesCommand(recipe),
				cancellationToken);
		}

		return CommandResponse.Ok(recipe);
	}
}
