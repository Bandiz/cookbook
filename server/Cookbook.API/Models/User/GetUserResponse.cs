using System;
using System.Collections.Generic;
using Cookbook.API.Entities;

namespace Cookbook.API.Models.User;

public record GetUserResponse(
	string Id,
	string UserName,
	string Email,
	bool EmailConfirmed,
	bool LockoutEnabled,
	DateTimeOffset? LockoutEnd,
	List<string> Roles,
    string Name,
	string LastName,
	int AccessFailedCount,
	string GoogleId)
{
	public GetUserResponse(CookbookUser user) : this(
		user.Id.ToString(),
		user.UserName,
		user.Email,
		user.EmailConfirmed,
		user.LockoutEnabled,
		user.LockoutEnd,
		user.Roles,
        user.Name,
		user.LastName,
		user.AccessFailedCount,
		user.GoogleId)
	{
	}
}
