using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Models.Recipe;
using Cookbook.API.Services.Interfaces;
using MediatR;
using MongoDB.Bson;

namespace Cookbook.API.Commands.Recipe;

public class UpdateRecipeCommand : IRequest<CommandResponse>
{
	public int Id { get; set; }
	public UpdateRecipeRequest Request { get; set; }
	public string User { get; set; }
}

public class UpdateRecipeCommandHandler(
	IRecipeService recipeService,
	IImageService imageService) : IRequestHandler<UpdateRecipeCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UpdateRecipeCommand command,
		CancellationToken cancellationToken)
	{
		var recipe = recipeService.GetRecipe(command.Id);
		if (recipe == null)
		{
			return new NotFoundResponse("Recipe not found");
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
			if (!string.IsNullOrEmpty(model.MainImage))
			{
				if (!ObjectId.TryParse(model.MainImage, out var parsedId))
				{
					return new BadRequestResponse("MainImage is not a valid ObjectId");
				}
				var notFoundIds = await imageService.CheckExistingImages([parsedId]);

				if (notFoundIds.Count > 0)
				{
					return new BadRequestResponse("MainImage does not exist");
				}
			}

			updated = true;
			recipe.MainImage = model.MainImage;
		}

		if (model.PrepTimeMinutes.HasValue)
		{
			updated = true;
			recipe.PrepTimeMinutes = model.PrepTimeMinutes.Value;
		}

		if (model.CookTimeMinutes.HasValue)
		{
			updated = true;
			recipe.CookTimeMinutes = model.CookTimeMinutes.Value;
		}

		if (model.TotalTimeMinutes.HasValue)
		{
			updated = true;
			recipe.TotalTimeMinutes = model.TotalTimeMinutes.Value;
		}

		if (model.Categories != null)
		{
			updated = true;
			recipe.Categories = model.Categories;
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
			await recipeService.UpdateRecipe(recipe, cancellationToken);
		}

		return new SuccessResponse<GetRecipeResponse>(new(recipe));
	}
}
