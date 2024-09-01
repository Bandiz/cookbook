using Cookbook.API.Models.Category;
using FluentValidation;

namespace Cookbook.API.Validators.Category;

public class CreateCategoryRequestValidator : AbstractValidator<CreateCategoryRequest>
{
	public CreateCategoryRequestValidator(
		ImageValidator imageValidator, 
		ImagesValidator imagesValidator)
	{
		RuleFor(x => x.CategoryName).NotEmpty().MaximumLength(50);
		RuleFor(x => x.MainImage).SetValidator(imageValidator);
		RuleFor(x => x.Images).SetValidator(imagesValidator);
	}
}
