using System.Collections.Generic;

namespace Cookbook.API.Models.User;
#nullable enable
public class UpdateUserRequest
{
	public string? Email { get; set; }
	public string? UserName { get; set; }
	public string? Name { get; set; }
	public string? LastName { get; set; }
	public List<string>? Roles { get; set; }
}
