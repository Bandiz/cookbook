using System.Collections.Generic;

namespace Cookbook.API.Models.Image;

public record CategoryImageResponseModel(
	string CategoryName,
	List<string> ImageIds);
