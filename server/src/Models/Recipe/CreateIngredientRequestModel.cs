using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record CreateIngredientRequestModel(
	[Required] int Amount,
	[Required] string MeasurementType,
	[Required] string Name);
