using Cookbook.API.Models.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class CreateRecipeRequestValidator : AbstractValidator<CreateRecipeRequestModel>
{
	public CreateRecipeRequestValidator()
	{
		RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
		RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
		RuleFor(x => x.PrepTimeMinutes).NotEmpty().GreaterThan(0);
		RuleFor(x => x.CookTimeMinutes).NotEmpty().GreaterThan(0);
		RuleFor(x => x.TotalTimeMinutes).NotEmpty().GreaterThan(0);
		RuleFor(x => x.MainImage).NotEmpty().MaximumLength(500);
		RuleFor(x => x.Categories).NotEmpty();
		RuleForEach(x => x.Categories).NotEmpty().MaximumLength(50);
		RuleFor(x => x.Ingredients).NotEmpty();
		RuleForEach(x => x.Ingredients).SetValidator(new IngredientRequestValidator());
		RuleFor(x => x.Instructions).NotEmpty();
		RuleForEach(x => x.Instructions).SetValidator(new InstructionRequestValidator());
		RuleFor(x => x.IsPublished).NotNull();
	}
}
