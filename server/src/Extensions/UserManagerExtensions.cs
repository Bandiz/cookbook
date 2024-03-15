using Cookbook.API.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cookbook.API.Extensions
{
    public static class UserManagerExtensions
    {
        public static Task<CookbookUser> CreateUserAsync(this UserManager<CookbookUser> manager, GoogleJsonWebSignature.Payload payload)
        {
            return CreateUserAsync(
                    manager,
                    payload.Email,
                    payload.Email,
                    null,
                    payload.GivenName,
                    payload.FamilyName,
                    payload.Name,
                    payload.EmailVerified,
                    payload.Subject
                );
        }

        public static async Task<CookbookUser> CreateUserAsync(this UserManager<CookbookUser> manager, string email, string userName, string password, string name, string lastName, string fullName, bool? emailConfirmed, string googleId)
        {
            var user = new CookbookUser()
            {
                Email = email,
                EmailConfirmed = emailConfirmed.HasValue && emailConfirmed.Value,
                UserName = userName,
                Name = name,
                LastName = lastName,
                FullName = fullName,
                GoogleId = googleId,
                Roles = new List<string> { "User" }
            };

            if (!string.IsNullOrEmpty(password))
            {
                user.PasswordHash = manager.PasswordHasher.HashPassword(user, password);
            }
            var result = await manager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return null;
            }

            return user;
        }

    }
}
