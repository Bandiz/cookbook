using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Models.Recipe;
using Cookbook.API.Services.Interfaces;
using Cookbook.API.Validators.Recipe;
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
	IRecipeQueries recipeQueries,
	UpdateRecipeCommandValidator validator) 
	: IRequestHandler<UpdateRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UpdateRecipeCommand command,
		CancellationToken cancellationToken)
	{
		var result = await validator.ValidateAsync(command, cancellationToken);

		if (!result.IsValid)
		{
			return CommandResponse.Invalid(result);
		}

		var recipe = recipeQueries.GetRecipe(command.Id);
		if (recipe == null)
		{
			return CommandResponse.NotFound("Recipe not found");
		}
		
		var request = command.Request;
		var updated = false;

		if (!string.IsNullOrEmpty(request.Title) && recipe.Title != request.Title)
		{
			updated = true;
			recipe.Title = request.Title;
		}

		if (recipe.Description != request.Description)
		{
			updated = true;
			recipe.Description = request.Description;
		}

		if (recipe.MainImage != request.MainImage)
		{
			updated = true;
			recipe.MainImage = request.MainImage;
		}

		if (request.PrepTimeMinutes.HasValue && request.PrepTimeMinutes != recipe.PrepTimeMinutes)
		{
			updated = true;
			recipe.PrepTimeMinutes = request.PrepTimeMinutes.Value;
		}

		if (request.CookTimeMinutes.HasValue && request.CookTimeMinutes != recipe.CookTimeMinutes)
		{
			updated = true;
			recipe.CookTimeMinutes = request.CookTimeMinutes.Value;
		}

		if (request.TotalTimeMinutes.HasValue && request.TotalTimeMinutes != recipe.TotalTimeMinutes)
		{
			updated = true;
			recipe.TotalTimeMinutes = request.TotalTimeMinutes.Value;
		}

		if (request.Categories != null)
		{
			updated = true;
			recipe.Categories = request.Categories.ConvertAll(x => x
				.ToLower()
				.Trim()
				.CapitalizeFirstLetter());
		}

		if (request.Ingredients != null)
		{
			updated = true;
			recipe.Ingredients = request.Ingredients.Select((x, index) => new Ingredient
			{
				Amount = x.Amount,
				MeasurementType = x.MeasurementType,
				Name = x.Name,
			}).ToList();
		}

		if (request.Instructions != null)
		{
			updated = true;
			recipe.Instructions = request.Instructions.Select(x => new Instruction
			{
				Description = x.Description,
			}).ToList();
		}

		if (request.IsPublished.HasValue && recipe.IsPublished != request.IsPublished)
		{
			updated = true;
			recipe.IsPublished = request.IsPublished.Value;
		}

		if (request.IsFeatured.HasValue)
		{
			updated = true;
			recipe.IsFeatured = request.IsFeatured.Value;
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
