namespace Cookbook.API.Models.Recipe;

public record IngredientRequest(
	int Amount,
	string MeasurementType,
	string Name);
