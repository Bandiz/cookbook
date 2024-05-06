using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.Category;

public record CategoryResponseModel(
	string CategoryName,
	bool Visible,
	string UpdatedBy,
	DateTime? UpdatedAt,
	string CreatedBy,
	DateTime CreatedAt,
	List<string> Images,
	string MainImage);
