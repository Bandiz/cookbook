using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MediatR;

namespace Cookbook.API.Commands.Category;

public class DeleteCategoryCommand : IRequest<CommandResponse>
{
	public string CategoryName { get; set; }
}

public class DeleteCategoryCommandHandler(
	ICategoryService categoryService,
	IRecipeService recipeService) : 
	IRequestHandler<DeleteCategoryCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		DeleteCategoryCommand request, 
		CancellationToken cancellationToken)
	{
		var categoryName = request.CategoryName;

		if (string.IsNullOrEmpty(categoryName))
		{
			return CommandResponse.BadRequest("Category name required");
		}
		var existingCategory = categoryService.GetCategory(categoryName);

		if (existingCategory == null)
		{
			return CommandResponse.NotFound(categoryName);
		}

		// TODO: create admin warnings
		await recipeService.RemoveCategoryAll(categoryName, cancellationToken);
		await categoryService.DeleteCategory(categoryName, cancellationToken);

		return CommandResponse.Ok();
	}
}
