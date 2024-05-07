using Cookbook.API.Entities;
using Cookbook.API.Models.Auth;

namespace Cookbook.API.Extensions;

public static class CookbookUserExtensions
{
	public static AuthUserResponseModel GetAuthUserResponse(this CookbookUser user)
	{
		return new AuthUserResponseModel(user.Email, user.LastName, user.Name, user.IsAdmin);
	}
}
