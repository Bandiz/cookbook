using Cookbook.API.Models.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class InstructionRequestValidator : AbstractValidator<CreateInstructionRequest>
{
	public InstructionRequestValidator()
	{
		RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
	}
}
