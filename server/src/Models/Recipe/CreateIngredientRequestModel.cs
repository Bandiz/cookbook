using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record CreateIngredientRequestModel(int Amount, string MeasurementType, [property: Required] string Name, int Position);
