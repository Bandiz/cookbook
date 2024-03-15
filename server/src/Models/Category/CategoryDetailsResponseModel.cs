using System.Collections.Generic;

namespace Cookbook.API.Models.Category
{
    public class CategoryDetailsResponseModel
    {
        public List<CategoryRecipeResponseModel> Recipes { get; set; }
    }
}
