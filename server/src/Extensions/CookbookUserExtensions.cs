using Cookbook.API.Models;
using Cookbook.API.Models.Auth;

namespace Cookbook.API.Extensions
{
	public static class CookbookUserExtensions
	{

		public static AuthUserResponseModel GetAuthUserResponse(this CookbookUser user)
		{
			return new AuthUserResponseModel()
			{
				Email = user.Email,
				LastName = user.LastName,
				Name = user.Name,
				IsAdmin = user.IsAdmin
			};
		}
	}
}
