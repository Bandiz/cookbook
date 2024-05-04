using System.Collections.Generic;

namespace Cookbook.API.Models.Category
{
	public class CategoryDetailsResponseModel : CategoryResponseModel
	{
		public List<CategoryRecipeResponseModel> Recipes { get; set; }
	}
}
