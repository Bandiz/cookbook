using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

public record GetPublicCategoriesResponse(List<GetPublicCategoryResponse> Categories);
