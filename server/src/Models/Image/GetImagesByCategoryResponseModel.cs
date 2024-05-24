using System.Collections.Generic;

namespace Cookbook.API.Models.Image;

public record GetImagesByCategoryResponseModel(
	List<string> UncategorizedImages,
	List<CategoryImageResponseModel> Categories);
