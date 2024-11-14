using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

public record GetCategoryRecipesResponse(List<GetCategoryRecipeResponse> Recipes);
