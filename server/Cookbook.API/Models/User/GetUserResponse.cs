using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.User;

public record GetUserResponse(
	string Name, 
	string LastName, 
	List<string> Roles,
	string UserName,
	string email,
	DateTimeOffset? lockoutEnd,
	bool lockoutEnabled,
	int accessFailedCount);
