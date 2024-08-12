namespace Cookbook.API.Commands;

public abstract class CommandResponse
{
	public static SuccessResponse Ok() => new();
	public static SuccessResponse<T> Ok<T>(T data) => new(data);
	public static NotFoundResponse NotFound(string message) => new(message);
	public static BadRequestResponse BadRequest(string message) => new(message);
}

public class SuccessResponse<T>(T data) : CommandResponse
{
	public T Data { get; } = data;
}

public class SuccessResponse() : CommandResponse
{
}

public class NotFoundResponse(string message) : CommandResponse
{
	public string Message { get; } = message;
}

public class BadRequestResponse(string message) : CommandResponse
{
	public string Message { get; } = message;
}
