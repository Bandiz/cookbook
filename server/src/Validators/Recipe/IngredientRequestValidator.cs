using Cookbook.API.Models.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class IngredientRequestValidator : AbstractValidator<CreateIngredientRequestModel>
{
	public IngredientRequestValidator()
	{
		RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
		RuleFor(x => x.Amount).NotEmpty().GreaterThan(0);
		RuleFor(x => x.MeasurementType).NotEmpty().MaximumLength(50);
	}
}
