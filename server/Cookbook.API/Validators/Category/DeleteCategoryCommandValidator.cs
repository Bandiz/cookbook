using Cookbook.API.Commands.Category;
using FluentValidation;

namespace Cookbook.API.Validators.Category;

public class DeleteCategoryCommandValidator : AbstractValidator<DeleteCategoryCommand>
{
	public DeleteCategoryCommandValidator()
	{
		RuleFor(x => x.CategoryName).NotEmpty();
	}
}
