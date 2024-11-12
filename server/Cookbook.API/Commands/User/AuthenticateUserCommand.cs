using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Models.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Cookbook.API.Commands.User;

public record AuthenticateUserCommand(LoginRequest Request) : IRequest<CommandResponse>;

public class AuthenticateUserCommandHandler(
	UserManager<CookbookUser> userManager) 
	: IRequestHandler<AuthenticateUserCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		AuthenticateUserCommand command,
		CancellationToken cancellationToken)
	{
		var request = command.Request;

		var user = await userManager.FindByNameAsync(request.Username);

		if (user == null)
		{
			return CommandResponse.BadRequest("Username or password wrong");
		}
		var isLockedOut = await userManager.IsLockedOutAsync(user);
		var isCorrectPassword = await userManager.CheckPasswordAsync(user, request.Password);

		if (isLockedOut && isCorrectPassword)
		{
			return CommandResponse.BadRequest("User is locked out");
		}

		if (!isCorrectPassword)
		{
			await userManager.AccessFailedAsync(user);
			return CommandResponse.BadRequest("Username or password wrong");
		}

		return CommandResponse.Ok(user);
	}
}
