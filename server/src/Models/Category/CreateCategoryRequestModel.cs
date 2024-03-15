namespace Cookbook.API.Models.Category
{
    public class CreateCategoryRequestModel
    {
        public string CategoryName { get; set; }

        public bool Visible { get; set; }
    }
}
