using System;

namespace Cookbook.API.Models.Category
{
    public class CategoryRecipeResponseModel
    {
        public int Id { get; set; }
        
        public string Title { get; set; }

		public string CategoryName { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedAt{ get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
