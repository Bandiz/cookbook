using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe
{
    public class GetRecipeResponseModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int PrepTimeMinutes { get; set; }

        public int CookTimeMinutes { get; set; }

        public int TotalTimeMinutes { get; set; }

        public string ImageUrl { get; set; }

        public List<string> Categories { get; set; }

        public List<InstructionResponseModel> Instructions { get; set; }

        public List<IngredientResponseModel> Ingredients { get; set; }
    }
}
