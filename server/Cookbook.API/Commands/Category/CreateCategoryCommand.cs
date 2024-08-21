using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Extensions;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using MediatR;

namespace Cookbook.API.Commands.Category;

public class CreateCategoryCommand : IRequest<CommandResponse>
{
	public CreateCategoryRequest Request { get; set; }
	public string User { get; set; }
}

public class CreateCategoryCommandHandler(
	ICategoryService categoryService,
	IImageQueries imageQueries) : 
	IRequestHandler<CreateCategoryCommand, CommandResponse>
{

	public async Task<CommandResponse> Handle(
		CreateCategoryCommand command,
		CancellationToken cancellationToken)
	{
		var request = command.Request;
		var existingCategory = await categoryService.GetCategory(request.CategoryName);

		if (existingCategory != null)
		{
			return CommandResponse.BadRequest($"Category exists: {existingCategory.CategoryName}");
		}

		if (!string.IsNullOrEmpty(request.MainImage) || request.Images != null && request.Images.Count > 0)
		{
			IEnumerable<string> imagesToCheck = [request.MainImage, .. request.Images ?? []];

			var (parsedImageIds, failedParsedIds) = imagesToCheck.ParseImageIds();

			if (failedParsedIds.Count != 0)
			{
				return CommandResponse.BadRequest($"Image id's are incorrect [{string.Join(", ", failedParsedIds)}]");
			}

			var missingIds = await imageQueries.CheckExistingImages(parsedImageIds);

			if (missingIds.Count != 0)
			{
				return CommandResponse.BadRequest($"Image id's that do not exist [{string.Join(", ", missingIds)}]");
			}
		}

		var category = new Entities.Category()
		{
			CategoryName = request.CategoryName,
			Visible = request.Visible,
			MainImage = request.MainImage,
			Images = request.Images?.Distinct().ToList() ?? [],
			CreatedBy = command.User,
			CreatedAt = DateTime.UtcNow
		};

		categoryService.CreateCategory(category);
		return CommandResponse.Ok(new CategoryResponse(category));
	}
}
