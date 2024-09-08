using FluentValidation;
using MongoDB.Bson;

namespace Cookbook.API.Validators.Recipe;

public class DeleteImageRequestValidator : AbstractValidator<string>
{
	public DeleteImageRequestValidator()
	{
		RuleFor(id => id)
			.Must(BeAValidObjectId).WithMessage("Invalid image ID format");
	}

	private bool BeAValidObjectId(string imageId)
	{
		return ObjectId.TryParse(imageId, out _);
	}
}
