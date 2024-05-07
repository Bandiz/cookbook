namespace Cookbook.API.Models.Recipe;

public record UpdateIngredientRequestModel(
	int? Amount,
	string MeasurementType,
	string Name,
	int? Position);
