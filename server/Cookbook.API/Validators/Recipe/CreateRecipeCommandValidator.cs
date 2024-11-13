using Cookbook.API.Commands.Recipe;
using FluentValidation;

namespace Cookbook.API.Validators.Recipe;

public class CreateRecipeCommandValidator : AbstractValidator<CreateRecipeCommand>
{
	public CreateRecipeCommandValidator(
		ImageValidator imageValidator,
		IngredientValidator ingredientValidator,
		InstructionValidator instructionValidator)
	{
		RuleFor(x => x.User).NotNull().NotEmpty();
		RuleFor(x => x.Request.Title).NotEmpty().MaximumLength(100);
		RuleFor(x => x.Request.Description).MaximumLength(500);
		RuleFor(x => x.Request.PrepTimeMinutes).GreaterThanOrEqualTo(0);
		RuleFor(x => x.Request.CookTimeMinutes).GreaterThanOrEqualTo(0);
		RuleFor(x => x.Request.TotalTimeMinutes).GreaterThanOrEqualTo(0);
		RuleFor(x => x.Request.MainImage).SetValidator(imageValidator);
		RuleForEach(x => x.Request.Categories).NotEmpty().MaximumLength(50);
		RuleForEach(x => x.Request.Ingredients).SetValidator(ingredientValidator);
		RuleForEach(x => x.Request.Instructions).SetValidator(instructionValidator);
		RuleFor(x => x.Request.IsPublished).NotNull();
		RuleFor(x => x.Request.IsFeatured).NotNull();
	}
}
