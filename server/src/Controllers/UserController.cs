using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cookbook.API.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class UserController(UserManager<CookbookUser> userManager) : ControllerBase
{
	[AllowAnonymous]
	[HttpPost]
	public async Task<IActionResult> CreateUser(
		[FromForm] CreateUserRequest model)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var user = await userManager.FindByEmailAsync(model.Email);

		if (user != null)
		{
			return BadRequest("User already exists");
		}

		user = await userManager.CreateUserAsync(model.Email, model.UserName, model.Password, model.Name, model.LastName, $"{model.Name} {model.LastName}", false, string.Empty);

		if (user == null)
		{
			return BadRequest("User could not be created");
		}

		return Ok("User created successfully!");
	}
}
