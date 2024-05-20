using Cookbook.API.Entities;

namespace Cookbook.API.Models.Recipe;

public record IngredientResponseModel(
	int Amount,
	string MeasurementType,
	string Name)
{
	public IngredientResponseModel(Ingredient ingredient) : this(
		ingredient.Amount,
		ingredient.MeasurementType,
		ingredient.Name)
	{
	}
}
