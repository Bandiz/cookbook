using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.Category
{
    public class CategoryResponseModel
    {
        public string CategoryName { get; set; }

        public bool Visible { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

		public List<string> Images { get; set; }

	}
}
