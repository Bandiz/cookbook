using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

public record CategoryRecipesResponse(List<CategoryRecipeResponse> Recipes);
