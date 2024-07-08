using Cookbook.API.Entities;

namespace Cookbook.API.Models.Recipe;

public record IngredientResponse(
	int Amount,
	string MeasurementType,
	string Name)
{
	public IngredientResponse(Ingredient ingredient) : this(
		ingredient.Amount,
		ingredient.MeasurementType,
		ingredient.Name)
	{
	}
}
