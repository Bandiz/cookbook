using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Extensions;
using Cookbook.API.Models.User;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Cookbook.API.Commands.User;

public class CreateUserCommand : IRequest<CommandResponse>
{
	public CreateUserRequest Request { get; set; }
}

public class CreateUserCommandHandler(UserManager<CookbookUser> userManager) :
	IRequestHandler<CreateUserCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		CreateUserCommand command,
		CancellationToken cancellationToken)
	{
		var request = command.Request;
		var user = await userManager.FindByEmailAsync(request.Email);

		if (user != null)
		{
			return CommandResponse.BadRequest("User already exists");
		}

		user = await userManager.CreateUserAsync(
			request.Email,
			request.UserName,
			request.Password,
			request.Name,
			request.LastName,
			$"{request.Name} {request.LastName}",
			false,
			string.Empty);

		if (user == null)
		{
			return CommandResponse.BadRequest("User could not be created");
		}

		return CommandResponse.Ok("User created successfully!");
	}
}
