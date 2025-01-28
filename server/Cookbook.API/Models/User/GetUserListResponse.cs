using System;
using System.Collections.Generic;
using Cookbook.API.Entities;

namespace Cookbook.API.Models.User;

public record GetUserListResponse(
	string Id,
	string Name,
	string LastName,
	List<string> Roles,
	string UserName,
	string Email,
	DateTimeOffset? LockoutEnd,
	bool LockoutEnabled,
	int AccessFailedCount)
{
	public GetUserListResponse(CookbookUser user) : this(
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
