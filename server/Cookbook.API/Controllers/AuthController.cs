using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Cookbook.API.Configuration;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
	AuthenticationSettings authenticationSettings,
	UserManager<CookbookUser> userManager) : ControllerBase
{
	[HttpPost("login/google")]
	public async Task<IActionResult> GetTokenGoogle([FromQuery] string t)
	{
		if (string.IsNullOrEmpty(t))
		{
			return BadRequest("Google token is not provided");
		}
		GoogleJsonWebSignature.Payload googlePayload;
		try
		{
			googlePayload = await GoogleJsonWebSignature.ValidateAsync(t,
				new GoogleJsonWebSignature.ValidationSettings()
			{
				Audience = [authenticationSettings.Google.ClientId]
			});
		}
		catch
		{
			return BadRequest("Google token is not valid");
		}

		var user = await userManager.FindByEmailAsync(googlePayload.Email);

		if (user == null)
		{
			user = await userManager.CreateUserAsync(googlePayload);

			if (user == null)
			{
				return BadRequest("User could not be created");
			}
		}

		await LoginUser(user);

		return Ok(new
		{
			user = user.GetAuthUserResponse()
		});
	}



	[HttpPost("login")]
	public async Task<IActionResult> GetToken([FromForm] string userName, [FromForm] string password)
	{
		var user = await userManager.FindByNameAsync(userName);

		if (user == null || !await userManager.CheckPasswordAsync(user, password))
		{
			return BadRequest("Username or password wrong");
		}

		await LoginUser(user);

		return Ok(new
		{
			user = user.GetAuthUserResponse()
		});
	}

	[HttpGet("isLoggedIn")]
	public async Task<IActionResult> IsLoggedIn()
	{
		try
		{
			var result = await HttpContext.AuthenticateAsync();
			if (!result.Succeeded)
			{
				return Ok(new { IsLoggedIn = false });
			}

			var user = await userManager.FindByNameAsync(result.Principal.Identity.Name);
			return Ok(new
			{
				IsLoggedIn = true,
				User = user.GetAuthUserResponse()
			});
		}
		catch (Exception)
		{
			return Ok(new { IsLoggedIn = false });
		}
	}


	[Authorize]
	[HttpDelete("logout")]
	public async Task<IActionResult> Logout()
	{
		await HttpContext.SignOutAsync();
		return Ok();
	}

	private async Task LoginUser(CookbookUser user)
	{
		var claims = new List<Claim>
		{
			new(ClaimTypes.Name, user.UserName),
		};

		claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role)));

		var claimsIdentity = new ClaimsIdentity(
			claims,
			CookieAuthenticationDefaults.AuthenticationScheme);

		var authProperties = new AuthenticationProperties
		{
			AllowRefresh = true,
			IsPersistent = true,
			IssuedUtc = DateTime.UtcNow,
		};

		await HttpContext.SignInAsync(
			CookieAuthenticationDefaults.AuthenticationScheme,
			new ClaimsPrincipal(claimsIdentity),
			authProperties);
	}
}


