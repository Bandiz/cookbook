using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Commands;
using Cookbook.API.Commands.User;
using Cookbook.API.Configuration;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Models.Auth;
using Google.Apis.Auth;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
	IMediator mediator,
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

		return Ok(new LoginResponse(user));
	}

	[HttpPost("login")]
	public async Task<IActionResult> GetToken(
		[FromBody] LoginRequest request,
		CancellationToken cancellationToken)
	{
		var response = await mediator.Send(
			new AuthenticateUserCommand(request),
			cancellationToken);

		if (response is SuccessResponse<CookbookUser> success)
		{
			var user = success.Data;
			await LoginUser(user);
			return Ok(new LoginResponse(user));
		}

		return response switch
		{
			ValidationResponse validationResponse => BadRequest(
				validationResponse
					.Result
					.ToValidationResponse()),
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
			_ => StatusCode(500, "An unexpected error occurred")
		};
	}

	[HttpGet("isLoggedIn")]
	public async Task<IActionResult> IsLoggedIn()
	{
		try
		{
			var result = await HttpContext.AuthenticateAsync();
			if (!result.Succeeded)
			{
				return Ok();
			}

			var user = await userManager.FindByNameAsync(result.Principal.Identity.Name);
			return Ok(new LoginResponse(user));
		}
		catch (Exception)
		{
			return Ok();
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


