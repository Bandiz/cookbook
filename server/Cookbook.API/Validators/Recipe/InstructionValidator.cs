using Cookbook.API.Models.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class InstructionValidator : AbstractValidator<InstructionRequest>
{
	public InstructionValidator()
	{
		RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
	}
}
