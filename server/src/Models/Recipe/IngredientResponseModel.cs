using Cookbook.API.Entities;

namespace Cookbook.API.Models.Recipe
{
    public class IngredientResponseModel
    {
        public IngredientResponseModel()
        {
        }

        public IngredientResponseModel(Ingredient ingredient)
        {
            Id = ingredient.Id;
            Amount = ingredient.Amount;
            MeasurementType = ingredient.MeasurementType;
            Name = ingredient.Name;
            Position = ingredient.Position;
        }

        public int Id { get; set; }

        public int Amount { get; set; }

        public string MeasurementType { get; set; }

        public string Name { get; set; }

        public int Position { get; set; }
    }
}
