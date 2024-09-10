using Cookbook.API.Commands.Image;
using FluentValidation;
using MongoDB.Bson;

namespace Cookbook.API.Validators.Image;

public class DeleteImageCommandValidator : AbstractValidator<DeleteImageCommand>
{
	public DeleteImageCommandValidator()
	{
		RuleFor(x => x.Id)
			.Must(BeAValidObjectId).WithMessage("Invalid image ID format");
	}

	private bool BeAValidObjectId(string imageId)
	{
		return ObjectId.TryParse(imageId, out _);
	}
}
