using System.Collections.Generic;

namespace Cookbook.API.Models.Image;

public record GetImagesByCategoryResponse(
	List<string> UncategorizedImages,
	List<CategoryImageResponse> Categories);
