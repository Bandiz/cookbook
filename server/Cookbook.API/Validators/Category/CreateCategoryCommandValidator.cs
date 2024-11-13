using Cookbook.API.Commands.Category;
using FluentValidation;

namespace Cookbook.API.Validators.Category;

public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
	public CreateCategoryCommandValidator(
		ImageValidator imageValidator, 
		ImagesValidator imagesValidator)
	{
		RuleFor(x => x.User).NotNull().NotEmpty();
		RuleFor(x => x.Request.CategoryName).NotEmpty().MaximumLength(50);
		RuleFor(x => x.Request.MainImage).SetValidator(imageValidator);
		RuleFor(x => x.Request.Images).SetValidator(imagesValidator);
		RuleFor(x => x.Request.IsFeatured).NotNull();
	}
}
