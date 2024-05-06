using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

public record CategoryRecipesResponseModel(List<CategoryRecipeResponseModel> Recipes);
