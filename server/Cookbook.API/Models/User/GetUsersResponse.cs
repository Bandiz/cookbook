using System.Collections.Generic;

namespace Cookbook.API.Models.User;

public record GetUsersResponse(List<GetUserResponse> Users);
