using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Commands;
using Cookbook.API.Commands.User;
using Cookbook.API.Entities;
using Cookbook.API.Models.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class UserController(IMediator mediator) : ControllerBase
{
	[AllowAnonymous]
	[HttpPost]
	public async Task<IActionResult> CreateUser(
		[FromForm] CreateUserRequest request,
		CancellationToken cancellationToken)
	{
		var response = await mediator.Send(new CreateUserCommand
		{ 
			Request = request 
		}, cancellationToken);

		return response switch
		{
			SuccessResponse<string> success => Ok(success.Data),
			BadRequestResponse badRequest => BadRequest(badRequest.Message),
			_ => StatusCode(500, "An error occurred while creating the user")
		};
	}

	[Authorize(Roles = "Admin")]
	[HttpGet]
	public IActionResult GetUsers(
		[FromServices] UserManager<CookbookUser> userManager)
	{
		return Ok(new GetUsersResponse([.. userManager.Users.Select(x => 
			new GetUserListResponse(x))]));
	}

	[Authorize(Roles = "Admin")]
	[HttpGet("{id}")]
	public async Task<IActionResult> GetUser(
		[FromRoute] string id,
		[FromServices] UserManager<CookbookUser> userManager)
	{
		var user = await userManager.FindByIdAsync(id);
		if (user == null)
		{
			return NotFound(id);
		}
		return Ok(new GetUserResponse(user));
	}
}
