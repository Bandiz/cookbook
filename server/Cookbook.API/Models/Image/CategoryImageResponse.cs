using System.Collections.Generic;

namespace Cookbook.API.Models.Image;

public record CategoryImageResponse(
	string CategoryName,
	List<string> ImageIds);
