using Cookbook.API.Commands.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class DeleteRecipeCommandValidator : AbstractValidator<DeleteRecipeCommand>
{
	public DeleteRecipeCommandValidator()
	{
		RuleFor(x => x.Id).NotEmpty();
	}
}
