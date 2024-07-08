using FluentValidation;
using FluentValidation.Validators;
using MongoDB.Bson;

namespace Cookbook.API.Validators;

public class ObjectIdValidator<T> : PropertyValidator<T, string>
{
	public override string Name => "ObjectIdValidator";

	public override bool IsValid(ValidationContext<T> context, string value)
	{
		if (string.IsNullOrWhiteSpace(value))
		{
			return true;
		}
		return ObjectId.TryParse(value, out var _);
	}

	protected override string GetDefaultMessageTemplate(string errorCode) => "{PropertyName} must be a valid ObjectId";
}
