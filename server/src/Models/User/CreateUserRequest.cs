namespace Cookbook.API.Models.User;

public record CreateUserRequest(
	string UserName,
	string Password,
	string Email,
	string Name,
	string LastName);
