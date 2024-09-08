﻿using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using Cookbook.API.Validators.Recipe;
using MediatR;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Commands.Image;

public record DeleteImageCommand(string Id) : IRequest<CommandResponse>;

public class DeleteImageCommandHandler(
	IDataAccess dataAccess,
	DeleteImageRequestValidator validator) : 
	IRequestHandler<DeleteImageCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		DeleteImageCommand command,
		CancellationToken cancellationToken)
	{
		var id = command.Id;
		var result = validator.Validate(id);

		if (!result.IsValid)
		{
			return CommandResponse.Invalid(result);
		}
		var imageId = ObjectId.Parse(id);
		var _imageBucket = dataAccess.ImageBucket;
		var filter = Builders<GridFSFileInfo>.Filter.Eq("metadata.parentImage", imageId);
		var fileCursor = await _imageBucket.FindAsync(
			filter, 
			cancellationToken: cancellationToken
		);
		var fileInfo = fileCursor.FirstOrDefault(cancellationToken: cancellationToken);

		if (fileInfo != null)
		{
			await _imageBucket.DeleteAsync(fileInfo.Id, cancellationToken);
		}
		await _imageBucket.DeleteAsync(imageId, cancellationToken);

		return CommandResponse.Ok();
	}
}
