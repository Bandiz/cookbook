using System.Collections.Generic;
using Cookbook.API.Models;
using FluentValidation.Results;

namespace Cookbook.API.Extensions;

public static class ValidationExtensions
{
	public static List<ValidationResponse> ToValidationResponse(
		this ValidationResult validationResult)
	{
		var validationResults = new List<ValidationResponse>();
		foreach (var error in validationResult.Errors)
		{
			validationResults.Add(new ValidationResponse(error.PropertyName, error.ErrorMessage));
		}

		return validationResults;
	}
}
