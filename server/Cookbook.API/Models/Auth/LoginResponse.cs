using Cookbook.API.Entities;

namespace Cookbook.API.Models.Auth;

public record LoginResponse(string Email, string LastName, string Name, bool IsAdmin)
{
	public LoginResponse(CookbookUser user) : this(
		user.Email,
		user.LastName,
		user.Name,
		user.IsAdmin)
	{
	}
}
