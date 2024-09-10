using Cookbook.API.Commands.Category;
using FluentValidation;

namespace Cookbook.API.Validators.Category;

public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
	public UpdateCategoryCommandValidator(
		ImageValidator imageValidator,
		ImagesValidator imagesValidator)
	{
		RuleFor(x => x.CategoryName).NotNull().NotEmpty();
		RuleFor(x => x.User).NotNull().NotEmpty();
		RuleFor(x => x.Request.MainImage).SetValidator(imageValidator);
		RuleFor(x => x.Request.Images).SetValidator(imagesValidator);
	}
}
