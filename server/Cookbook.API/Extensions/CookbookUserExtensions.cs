using Cookbook.API.Entities;
using Cookbook.API.Models.Auth;

namespace Cookbook.API.Extensions;

public static class CookbookUserExtensions
{
	public static AuthUserResponse GetAuthUserResponse(this CookbookUser user)
	{
		return new AuthUserResponse(user.Email, user.LastName, user.Name, user.IsAdmin);
	}
}
