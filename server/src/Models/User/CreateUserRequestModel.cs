namespace Cookbook.API.Models.User;

public record CreateUserRequestModel(
	string UserName,
	string Password,
	string Email,
	string Name,
	string LastName);
