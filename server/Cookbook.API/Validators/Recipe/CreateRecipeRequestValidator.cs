using Cookbook.API.Models.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class CreateRecipeRequestValidator : AbstractValidator<CreateRecipeRequest>
{
	public CreateRecipeRequestValidator(ImageValidator imageValidator)
	{
		RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
		RuleFor(x => x.Description).MaximumLength(500);
		RuleFor(x => x.PrepTimeMinutes).GreaterThanOrEqualTo(0);
		RuleFor(x => x.CookTimeMinutes).GreaterThanOrEqualTo(0);
		RuleFor(x => x.TotalTimeMinutes).GreaterThanOrEqualTo(0);
		RuleFor(x => x.MainImage).SetValidator(imageValidator);
		RuleForEach(x => x.Categories).NotEmpty().MaximumLength(50);
		RuleForEach(x => x.Ingredients).SetValidator(new IngredientRequestValidator());
		RuleForEach(x => x.Instructions).SetValidator(new InstructionRequestValidator());
		RuleFor(x => x.IsPublished).NotNull();
	}
}
