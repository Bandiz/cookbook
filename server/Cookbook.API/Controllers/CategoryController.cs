using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Commands;
using Cookbook.API.Commands.Category;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CategoryController(
	IMediator mediator,
	ICategoryQueries categoryQueries,
	IRecipeQueries recipeQueries) : ControllerBase
{
	[AllowAnonymous]
	[HttpGet]
	public IActionResult GetCategories()
	{
		var categories = categoryQueries
			.GetCategories();
		return Ok(new GetPublicCategoriesResponse(
			categories
				.ConvertAll(x => new GetPublicCategoryResponse(x))));
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{categoryName}")]
	public async Task<IActionResult> GetCategory(string categoryName)
	{
		var category = await categoryQueries.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}

		return Ok(new GetCategoryResponse(category));
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("list")]
	public IActionResult GetCategoriesList()
	{
		var categories = categoryQueries
			.GetCategories(false)
			.Select(x => new GetCategoryResponse(x));
		return Ok(categories);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{categoryName}/recipes")]
	public async Task<IActionResult> GetCategoryDetails(string categoryName)
	{
		var category = categoryQueries.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}
		var recipes = await recipeQueries.GetAllRecipes([categoryName]);

		return Ok(
			new GetCategoryRecipesResponse(recipes.Select(x =>
				new GetCategoryRecipeResponse(
					x.Id,
					x.Title,
					categoryName,
					x.CreatedBy,
					x.CreatedAt,
					x.UpdatedBy,
					x.UpdatedAt,
					x.IsFeatured)).ToList()));
	}

	[Authorize(Roles = "Admin")]
	[HttpPost]
	public async Task<IActionResult> CreateCategory(
		[FromBody] CreateCategoryRequest request,
		CancellationToken cancellationToken)
	{
		var response = await mediator.Send(new CreateCategoryCommand()
		{
			Request = request,
			User = User.Identity.Name
		}, cancellationToken);

		return response switch
		{
			SuccessResponse<Category> success => CreatedAtAction(
				nameof(GetCategory),
				new { categoryName = success.Data.CategoryName },
				new GetCategoryResponse(success.Data)
			),
			ValidationResponse validationResponse => BadRequest(
				validationResponse
					.Result
					.ToValidationResponse()),
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

	[Authorize(Roles = "Admin")]
	[HttpDelete("{categoryName}")]
	public async Task<IActionResult> DeleteCategory(
		[FromRoute] string categoryName,
		CancellationToken cancellationToken)
	{
		var response = await mediator.Send(new DeleteCategoryCommand()
		{
			CategoryName = categoryName
		}, cancellationToken);

		return response switch
		{
			SuccessResponse => Ok(),
			NotFoundResponse notFound => NotFound(notFound.Message),
			ValidationResponse validationResponse => BadRequest(
				validationResponse
					.Result
					.ToValidationResponse()),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

	[Authorize(Roles = "Admin")]
	[HttpPut("{categoryName}")]
	public async Task<IActionResult> UpdateCategory(
		[FromRoute] string categoryName,
		[FromBody] UpdateCategoryRequest request,
		CancellationToken cancellationToken)
	{
		var response = await mediator.Send(new UpdateCategoryCommand()
		{
			CategoryName = categoryName,
			Request = request,
			User = User.Identity.Name
		}, cancellationToken);

		return response switch
		{
			SuccessResponse<Category> success => Ok(new GetCategoryResponse(success.Data)),
			ValidationResponse validationResponse => BadRequest(
				validationResponse
					.Result
					.ToValidationResponse()),
			NotFoundResponse notFound => NotFound(notFound.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

}
