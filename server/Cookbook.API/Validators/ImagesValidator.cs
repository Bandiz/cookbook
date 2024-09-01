using Cookbook.API.Services.Interfaces;
using FluentValidation;
using MongoDB.Bson;
using System.Threading.Tasks;
using System.Threading;
using System.Collections.Generic;

namespace Cookbook.API.Validators;

public class ImagesValidator : AbstractValidator<List<string>>
{
	private readonly IImageQueries _imageQueries;

	public ImagesValidator(IImageQueries imageQueries)
	{
		_imageQueries = imageQueries;

		RuleFor(imageIds => imageIds)
			.Cascade(CascadeMode.Stop)
			.Must(BeAValidObjectId).WithMessage("Invalid image ID format.")
			.MustAsync(ImagesExists).WithMessage("Image does not exist.");
	}

	private static bool BeAValidObjectId(List<string> imageIds)
	{
		foreach (var id in imageIds)
		{
			if (!ObjectId.TryParse(id, out _))
			{
				return false;
			}
		}
		return true;
	}

	private async Task<bool> ImagesExists(
		List<string> imageIds, 
		CancellationToken cancellationToken)
	{
		var objectIds = imageIds.ConvertAll(ObjectId.Parse);
		var missingIds = await _imageQueries.CheckExistingImages(
			objectIds,
			cancellationToken);
		return missingIds.Count == 0;
	}
}
