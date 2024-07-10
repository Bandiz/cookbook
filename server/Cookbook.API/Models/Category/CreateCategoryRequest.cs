using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Category;

public record CreateCategoryRequest(
	[Required] string CategoryName,
	bool Visible,
	string MainImage,
	List<string> Images);
