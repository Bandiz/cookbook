using Cookbook.API.Services.Interfaces;
using FluentValidation;
using MongoDB.Bson;
using System.Threading.Tasks;
using System.Threading;

namespace Cookbook.API.Validators;

public class ImageValidator : AbstractValidator<string>
{
	private readonly IImageQueries _imageQueries;

	public ImageValidator(IImageQueries imageQueries)
	{
		_imageQueries = imageQueries;

		RuleFor(imageId => imageId)
			.Cascade(CascadeMode.Stop)
			.Must(BeAValidObjectId).WithMessage("Invalid image ID format.")
			.MustAsync(ImageExists).WithMessage("Image does not exist.");
	}

	private bool BeAValidObjectId(string imageId)
	{
		return ObjectId.TryParse(imageId, out _);
	}

	private async Task<bool> ImageExists(string imageId, CancellationToken cancellationToken)
	{
		var objectId = ObjectId.Parse(imageId);
		var missingIds = await _imageQueries.CheckExistingImages([objectId]);
		return missingIds.Count == 0;
	}
}
