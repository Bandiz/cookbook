namespace Cookbook.API.Models.Auth;

public record AuthUserResponseModel(string Email, string LastName, string Name, bool IsAdmin);
