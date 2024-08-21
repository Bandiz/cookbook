using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using MediatR;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Cookbook.API.Commands.Image;

public class DeleteImageCommand : IRequest<CommandResponse>
{
	public string Id { get; set; }
}

public class DeleteImageCommandHandler(IDataAccess dataAccess) : 
	IRequestHandler<DeleteImageCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
	DeleteImageCommand command,
		CancellationToken cancellationToken)
	{
		var id = command.Id;
		if (!ObjectId.TryParse(id, out var imageId))
		{
			return CommandResponse.BadRequest("Invalid imageId");
		}

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
