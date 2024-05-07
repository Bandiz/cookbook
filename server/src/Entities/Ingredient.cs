namespace Cookbook.API.Entities;

public class Ingredient
{
	public int Id { get; set; }

	public int Amount { get; set; }

	public string MeasurementType { get; set; }

	public string Name { get; set; }

	public int Position { get; set; }
}
