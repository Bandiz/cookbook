using Cookbook.API.Models.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class IngredientValidator : AbstractValidator<IngredientRequest>
{
	public IngredientValidator()
	{
		RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
		RuleFor(x => x.Amount).GreaterThan(0);
		RuleFor(x => x.MeasurementType).MaximumLength(50);
	}
}
