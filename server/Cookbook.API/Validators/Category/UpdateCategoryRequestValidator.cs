using Cookbook.API.Models.Category;
using FluentValidation;

namespace Cookbook.API.Validators.Category;

public class UpdateCategoryRequestValidator : AbstractValidator<UpdateCategoryRequest>
{
	public UpdateCategoryRequestValidator(
		ImageValidator imageValidator,
		ImagesValidator imagesValidator)
	{
		RuleFor(x => x.MainImage).SetValidator(imageValidator);
		RuleFor(x => x.Images).SetValidator(imagesValidator);
	}
}
