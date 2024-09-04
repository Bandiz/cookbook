using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Commands;
using Cookbook.API.Commands.Recipe;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Models;
using Cookbook.API.Models.Recipe;
using Cookbook.API.Services.Interfaces;
using Cookbook.API.Validators.Recipe;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class RecipeController(
	IRecipeService recipeService,
	IMediator mediator) : ControllerBase
{
	[AllowAnonymous]
	[HttpGet("{id:int}")]
	public IActionResult GetRecipe(int id)
	{
		var recipe = recipeService.GetRecipe(id);

		if (recipe == null)
		{
			return NotFound(id);
		}
		return Ok(new GetRecipeResponse(recipe));
	}

	[AllowAnonymous]
	[HttpGet]
	public IActionResult GetRecipes(
		string searchText,
		[FromQuery] List<string> categories,
		int count)
	{
		var recipes = recipeService.GetRecipes(searchText, count, categories);
		return Ok(recipes.Select(recipe => new GetRecipesResponse(
			recipe.Id,
			recipe.Title,
			recipe.TotalTimeMinutes,
			recipe.MainImage,
			recipe.Categories)));
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("list")]
	public async Task<IActionResult> GetRecipesList()
	{
		var recipes = await recipeService.GetAllRecipes();
		return Ok(recipes.Select(recipe => new GetRecipesListResponse(
			recipe.Id,
			recipe.Title,
			recipe.CreatedBy,
			recipe.CreatedAt,
			recipe.UpdatedBy,
			recipe.UpdatedAt,
			recipe.Categories,
			recipe.IsPublished)));
	}


	[Authorize(Roles = "Admin")]
	[HttpPost]
	public async Task<IActionResult> CreateRecipe(
		[FromBody] CreateRecipeRequest request,
		[FromServices] IValidator<CreateRecipeRequest> validator,
		CancellationToken cancellationToken)
	{
		var result = await validator.ValidateAsync(request, cancellationToken);

		if (!result.IsValid)
		{
			return BadRequest(result.ToValidationResponse());
		}

		var response = await mediator.Send(new CreateRecipeCommand()
		{
			Request = request,
			User = User.Identity!.Name
		}, cancellationToken);

		return response switch
		{
			SuccessResponse<Recipe> success => CreatedAtAction(
				nameof(GetRecipe),
				new { id = success.Data.Id },
				new GetRecipeResponse(success.Data)),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

	[Authorize(Roles = "Admin")]
	[HttpDelete("{id:int}")]
	public async Task<IActionResult> DeleteRecipe(
		[FromRoute] int id,
		CancellationToken cancellationToken)
	{
		var response = await mediator.Send(new DeleteRecipeCommand
		{
			Id = id,
		}, cancellationToken);

		return response switch
		{
			SuccessResponse => Ok(),
			NotFoundResponse notFound => NotFound(notFound.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

	[Authorize(Roles = "Admin")]
	[HttpPatch("{id:int}")]
	public async Task<IActionResult> UpdateRecipe(
		[FromRoute] int id,
		[FromBody] UpdateRecipeRequest request,
		[FromServices] IValidator<UpdateRecipeRequest> validator,
		CancellationToken cancellationToken)
	{
		var result = await validator.ValidateAsync(request, cancellationToken);

		if (!result.IsValid)
		{
			return BadRequest(result.ToValidationResponse());
		}

		var response = await mediator.Send(new UpdateRecipeCommand
		{
			Id = id,
			Request = request,
			User = User.Identity.Name
		}, cancellationToken);

		return response switch
		{
			SuccessResponse<Recipe> success => Ok(new GetRecipeResponse(success.Data)),
			NotFoundResponse notFound => NotFound(notFound.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}
}
