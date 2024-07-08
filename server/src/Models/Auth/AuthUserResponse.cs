namespace Cookbook.API.Models.Auth;

public record AuthUserResponse(string Email, string LastName, string Name, bool IsAdmin);
