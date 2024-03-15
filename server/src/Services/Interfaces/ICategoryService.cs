using Cookbook.API.Entities;
using System.Collections.Generic;

namespace Cookbook.API.Services.Interfaces
{
    public interface ICategoryService
    {
        Category GetCategory(string categoryName);

        List<Category> GetCategories(bool visible = true);

        Category CreateCategory(Category category);

        void DeleteCategory(string categoryName);

        List<Category> CreateCategories(List<Category> categories);

        void UpdateCategory(Category category);
    }
}