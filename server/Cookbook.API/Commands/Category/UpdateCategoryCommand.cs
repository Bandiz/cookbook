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

public class UpdateCategoryCommand : IRequest<CommandResponse>
{
	public string CategoryName { get; set; }
	public UpdateCategoryRequest Request { get; set; }
	public string User { get; set; }
}

public class UpdateCategoryCommandHandler(
	ICategoryService categoryService,
	IImageService imageService) : 
	IRequestHandler<UpdateCategoryCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UpdateCategoryCommand command, 
		CancellationToken cancellationToken)
	{
		var categoryName = command.CategoryName;
		var request = command.Request;

		if (string.IsNullOrEmpty(categoryName))
		{
			return CommandResponse.BadRequest("Category name required");
		}
		var existingCategory = await categoryService.GetCategory(categoryName);
		if (existingCategory == null)
		{
			return CommandResponse.NotFound(categoryName);
		}
		var updated = false;

		if (request.Visible.HasValue && existingCategory.Visible != request.Visible)
		{
			existingCategory.Visible = request.Visible.Value;
			updated = true;
		}

		if (!string.IsNullOrEmpty(request.MainImage) || request.Images != null)
		{
			IEnumerable<string> imagesToCheck = [request.MainImage, .. request.Images ?? []];

			var (parsedImageIds, failedParsedIds) = imagesToCheck.ParseImageIds();

			if (failedParsedIds.Count != 0)
			{
				return CommandResponse.BadRequest($"Image id's are incorrect [{string.Join(", ", failedParsedIds)}]");
			}

			var missingIds = await imageService.CheckExistingImages(parsedImageIds);

			if (missingIds.Count != 0)
			{
				return CommandResponse.BadRequest($"Image id's that do not exist [{string.Join(", ", missingIds)}]");
			}

			if (existingCategory.MainImage != request.MainImage)
			{
				existingCategory.MainImage = request.MainImage;
				updated = true;
			}

			if (request.Images != null)
			{
				existingCategory.Images = request.Images.Distinct().ToList();
				updated = true;
			}
		}

		if (updated)
		{
			existingCategory.UpdatedAt = DateTime.UtcNow;
			existingCategory.UpdatedBy = command.User;
			await categoryService.UpdateCategory(existingCategory, cancellationToken);
		}

		return CommandResponse.Ok(new CategoryResponse(existingCategory));
	}
}
