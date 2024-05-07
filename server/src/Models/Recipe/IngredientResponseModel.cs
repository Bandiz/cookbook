using Cookbook.API.Entities;

namespace Cookbook.API.Models.Recipe;

public record IngredientResponseModel(
	int Id,
	int Amount,
	string MeasurementType,
	string Name,
	int Position)
{
	public IngredientResponseModel(Ingredient ingredient) : this(
		ingredient.Id,
		ingredient.Amount,
		ingredient.MeasurementType,
		ingredient.Name,
		ingredient.Position)
	{
	}
}
