namespace Cookbook.API.Models.Recipe;

public record CreateIngredientRequest(
	int Amount,
	string MeasurementType,
	string Name);
