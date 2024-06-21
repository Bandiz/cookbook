namespace Cookbook.API.Models.Recipe;

public record CreateIngredientRequestModel(
	int Amount,
	string MeasurementType,
	string Name);
