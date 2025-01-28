using System;
using System.Collections.Generic;
using Cookbook.API.Entities;

namespace Cookbook.API.Models.User;

public record GetUserResponse(
	string id,
	string Name,
	string LastName,
	List<string> Roles,
	string UserName,
	string email,
	DateTimeOffset? lockoutEnd,
	bool lockoutEnabled,
	int accessFailedCount)
{
	public GetUserResponse(CookbookUser user) : this(
		user.Id.ToString(),
		user.Name,
		user.LastName,
		user.Roles,
		user.UserName,
		user.Email,
		user.LockoutEnd,
		user.LockoutEnabled,
		user.AccessFailedCount)
	{
	}
}
