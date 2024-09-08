using System;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using FluentValidation;
using MediatR;
using MongoDB.Driver;

namespace Cookbook.API.Commands.Category;

public class UpdateCategoryCommand : IRequest<CommandResponse>
{
	public string CategoryName { get; set; }
	public UpdateCategoryRequest Request { get; set; }
	public string User { get; set; }
}

public class UpdateCategoryCommandHandler(
	IDataAccess dataAccess,
	ICategoryQueries categoryQueries,
	IValidator<UpdateCategoryRequest> validator) : 
	IRequestHandler<UpdateCategoryCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UpdateCategoryCommand command, 
		CancellationToken cancellationToken)
	{
		var categoryName = command.CategoryName;
		var request = command.Request;

		var result = await validator.ValidateAsync(request, cancellationToken);

		if (!result.IsValid)
		{
			return CommandResponse.Invalid(result);
		}
		
		var category = await categoryQueries.GetCategory(categoryName);
		if (category == null)
		{
			return CommandResponse.NotFound(categoryName);
		}
		var updated = false;

		if (request.Visible.HasValue && category.Visible != request.Visible)
		{
			category.Visible = request.Visible.Value;
			updated = true;
		}

		if (category.MainImage != request.MainImage)
		{
			updated = true;
			category.MainImage = request.MainImage;
		}

		if (request.Images != null)
		{
			updated = true;
			category.Images = request.Images;
		}

		if (updated)
		{
			category.UpdatedAt = DateTime.UtcNow;
			category.UpdatedBy = command.User;

			await dataAccess.Categories.ReplaceOneAsync(
				x => x.CategoryName == category.CategoryName,
				category,
				cancellationToken: cancellationToken);
		}

		return CommandResponse.Ok(category);
	}
}
