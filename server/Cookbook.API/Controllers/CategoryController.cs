using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Commands;
using Cookbook.API.Commands.Category;
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
	ICategoryService categoryService,
	IRecipeService recipeService) : ControllerBase
{
	[AllowAnonymous]
	[HttpGet]
	public IActionResult GetCategories()
	{
		var categories = categoryService
			.GetCategories()
			.Select(x => x.CategoryName);
		return Ok(categories);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{categoryName}")]
	public async Task<IActionResult> GetCategory(string categoryName)
	{
		var category = await categoryService.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}

		return Ok(new CategoryResponse(category));
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("list")]
	public IActionResult GetCategoriesList()
	{
		var categories = categoryService
			.GetCategories(false)
			.Select(x => new CategoryResponse(x));
		return Ok(categories);
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{categoryName}/recipes")]
	public async Task<IActionResult> GetCategoryDetails(string categoryName)
	{
		var category = categoryService.GetCategory(categoryName);

		if (category == null)
		{
			return NotFound(categoryName);
		}
		var recipes = await recipeService.GetAllRecipes([categoryName]);

		return Ok(
			new CategoryRecipesResponse(recipes.Select(x =>
				new CategoryRecipeResponse(
					x.Id,
					x.Title,
					categoryName,
					x.CreatedBy,
					x.CreatedAt,
					x.UpdatedBy,
					x.UpdatedAt)).ToList()));
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
			SuccessResponse<CategoryResponse> success => CreatedAtAction(
				nameof(GetCategory),
				new { categoryName = success.Data.CategoryName },
				success.Data
			),
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
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
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
			SuccessResponse<CategoryResponse> success => Ok(success.Data),
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
			NotFoundResponse notFound => NotFound(notFound.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

}
