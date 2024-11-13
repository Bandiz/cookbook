using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Models.Category;
using Cookbook.API.Services.Interfaces;
using Cookbook.API.Validators.Category;
using MediatR;

namespace Cookbook.API.Commands.Category;

public class CreateCategoryCommand : IRequest<CommandResponse>
{
	public CreateCategoryRequest Request { get; set; }
	public string User { get; set; }
}

public class CreateCategoryCommandHandler(
	IDataAccess dataAccess,
	ICategoryQueries categoryQueries,
	CreateCategoryCommandValidator validator) : 
	IRequestHandler<CreateCategoryCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		CreateCategoryCommand command,
		CancellationToken cancellationToken)
	{
		var validatorResult = await validator.ValidateAsync(command, cancellationToken);

		if (!validatorResult.IsValid)
		{
			return CommandResponse.Invalid(validatorResult);
		}

		var request = command.Request;
		var existingCategory = await categoryQueries.GetCategory(request.CategoryName);

		if (existingCategory != null)
		{
			return CommandResponse.BadRequest("Category already exists");
		}

		var category = new Entities.Category()
		{
			CategoryName = request.CategoryName,
			Visible = request.Visible,
			MainImage = request.MainImage,
			Images = request.Images?.Distinct().ToList() ?? [],
			CreatedBy = command.User,
			CreatedAt = DateTime.UtcNow,
			IsFeatured = request.IsFeatured
		};

		await dataAccess.Categories.InsertOneAsync(
			category,
			cancellationToken: cancellationToken);

		return CommandResponse.Ok(category);
	}
}
