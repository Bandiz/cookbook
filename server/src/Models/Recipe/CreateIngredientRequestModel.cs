using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe
{
    public class CreateIngredientRequestModel
    {
        public int Amount { get; set; }

        public string MeasurementType { get; set; }

        [Required]
        public string Name { get; set; }

        public int Position { get; set; }
    }
}
