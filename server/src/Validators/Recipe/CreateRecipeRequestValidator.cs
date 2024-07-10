using Cookbook.API.Models.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class CreateRecipeRequestValidator : AbstractValidator<CreateRecipeRequest>
{
	public CreateRecipeRequestValidator()
	{
		RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
		RuleFor(x => x.Description).MaximumLength(500);
		RuleFor(x => x.PrepTimeMinutes).GreaterThan(0);
		RuleFor(x => x.CookTimeMinutes).GreaterThan(0);
		RuleFor(x => x.TotalTimeMinutes).GreaterThan(0);
		RuleFor(x => x.MainImage).SetValidator(new ObjectIdValidator<CreateRecipeRequest>());
		RuleForEach(x => x.Categories).NotEmpty().MaximumLength(50);
		RuleForEach(x => x.Ingredients).SetValidator(new IngredientRequestValidator());
		RuleForEach(x => x.Instructions).SetValidator(new InstructionRequestValidator());
		RuleFor(x => x.IsPublished).NotNull();
	}
}
