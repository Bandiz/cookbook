using Cookbook.API.Commands.User;
using FluentValidation;

namespace Cookbook.API.Validators.User;

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
	public UpdateUserCommandValidator()
	{
		RuleFor(x => x.Id).NotNull().NotEmpty();
		RuleFor(x => x.User).NotNull().NotEmpty();
		RuleFor(x => x.Request.Email).EmailAddress();
		RuleFor(x => x.Request.UserName).MaximumLength(50);
		RuleFor(x => x.Request.Name).MaximumLength(50);
		RuleFor(x => x.Request.LastName).MaximumLength(50);
		RuleFor(x => x.Request.Roles).NotEmpty();
		RuleForEach(x => x.Request.Roles)
			.NotNull()
			.NotEmpty()
			.Must(role => role is "Admin" or "User")
			.WithMessage("Role must be 'Admin' or 'User'");
	}
}
