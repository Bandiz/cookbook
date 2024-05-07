using System;
using System.Collections.Generic;

namespace Cookbook.API.Models.Recipe;

public record UpdateCategoriesResponse(List<string> Categories, string UpdatedBy, DateTime UpdatedAt);
