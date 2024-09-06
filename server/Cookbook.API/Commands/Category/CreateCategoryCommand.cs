using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MediatR;

namespace Cookbook.API.Commands.Category;

public class CreateCategoryCommand : IRequest<CommandResponse>
{
	public string CategoryName { get; set; }
	public bool Visible { get; set; }
	public string MainImage { get; set; }
	public List<string> Images { get; set; }
	public string User { get; set; }
}

public class CreateCategoryCommandHandler(
	IDataAccess dataAccess,
	ICategoryQueries categoryQueries) : 
	IRequestHandler<CreateCategoryCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		CreateCategoryCommand command,
		CancellationToken cancellationToken)
	{
		var existingCategory = await categoryQueries.GetCategory(command.CategoryName);

		if (existingCategory != null)
		{
			return CommandResponse.BadRequest("Category already exists");
		}

		var category = new Entities.Category()
		{
			CategoryName = command.CategoryName,
			Visible = command.Visible,
			MainImage = command.MainImage,
			Images = command.Images?.Distinct().ToList() ?? [],
			CreatedBy = command.User,
			CreatedAt = DateTime.UtcNow
		};

		await dataAccess.Categories.InsertOneAsync(
			category,
			cancellationToken: cancellationToken);

		return CommandResponse.Ok(category);
	}
}
