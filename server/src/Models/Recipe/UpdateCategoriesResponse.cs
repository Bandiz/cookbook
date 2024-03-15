using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe
{
    public class UpdateCategoriesResponse
    {
        public List<string> Categories { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
