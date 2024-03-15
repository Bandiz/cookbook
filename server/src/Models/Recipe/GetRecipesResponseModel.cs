using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe
{
    public class GetRecipesResponseModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int TotalTimeMinutes { get; set; }

        public string ImageUrl { get; set; }

        public List<string> Categories { get; set; }
    }
}
