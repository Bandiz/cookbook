namespace Cookbook.API.Commands;

public abstract class CommandResponse
{
}

public class SuccessResponse<T>(T data) : CommandResponse
{
	public T Data { get; } = data;
}

public class NotFoundResponse(string message) : CommandResponse
{
	public string Message { get; } = message;
}

public class BadRequestResponse(string message) : CommandResponse
{
	public string Message { get; } = message;
}
