using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record IngredientRequestModel(
	[property: Required] int Amount,
	[property: Required] string MeasurementType,
	[property: Required] string Name);
