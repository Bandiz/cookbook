using System;
using System.Threading;
using System.Threading.Tasks;
using Cookbook.API.Entities;
using Cookbook.API.Models.User;
using Cookbook.API.Validators.User;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Cookbook.API.Commands.User;

public record UpdateUserCommand : IRequest<CommandResponse>
{
	public string Id { get; set; }
	public UpdateUserRequest Request { get; set; }
	public string User { get; set; }
}

public class UpdateUserCommandHandler(
	UserManager<CookbookUser> userManager,
	UpdateUserCommandValidator validator) : IRequestHandler<UpdateUserCommand, CommandResponse>
{
	public async Task<CommandResponse> Handle(
		UpdateUserCommand command,
		CancellationToken cancellationToken)
	{
		var validationResult = await validator.ValidateAsync(command, cancellationToken);

		if (!validationResult.IsValid)
		{
			return CommandResponse.Invalid(validationResult);
		}

		var user = await userManager.FindByIdAsync(command.Id);

		if (user is null)
		{
			return CommandResponse.NotFound("User does not exist");
		}

		var request = command.Request;
		var isUpdated = false;

		if (string.IsNullOrEmpty(request.Email) && request.Email != user.Email)
		{
			isUpdated = true;
			user.Email = request.Email;
		}

		if (string.IsNullOrEmpty(request.UserName) && request.UserName != user.UserName)
		{
			isUpdated = true;
			user.UserName = request.UserName;
		}

		if (string.IsNullOrEmpty(request.Name) && request.Name != user.Name)
		{
			isUpdated = true;
			user.Name = request.Name;
		}

		if (string.IsNullOrEmpty(request.LastName) && request.LastName != user.LastName)
		{
			isUpdated = true;
			user.LastName = request.LastName;
		}

		if (request.Roles is not null)
		{
			var roles = await userManager.GetRolesAsync(user);
			var result = await userManager.RemoveFromRolesAsync(user, roles);
			if (result.Succeeded)
			{
				result = await userManager.AddToRolesAsync(user, request.Roles);
				if (result.Succeeded)
				{
					isUpdated = true;
				}
			}
		}

		if (isUpdated)
		{
			user.UpdatedBy = command.User;
			user.UpdatedAt = DateTime.UtcNow;
			await userManager.UpdateAsync(user);
		}

		return CommandResponse.Ok(user);
	}
}
