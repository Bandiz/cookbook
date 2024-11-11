using System;
using AspNetCore.Identity.Mongo;
using Cookbook.API.Configuration;
using Cookbook.API.Entities;
using Cookbook.API.Services;
using Cookbook.API.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Cookbook.API.Extensions;

public static class CookbookServicesExtensions
{
	public static void AddMongoDb(this IServiceCollection services, IConfiguration configuration)
	{
		var config = new CookbookDatabaseSettings();
		configuration.GetSection(nameof(CookbookDatabaseSettings)).Bind(config);
		services.AddSingleton(config);

		services.AddSingleton<IMongoClient, MongoClient>(sp => new MongoClient(config.ConnectionString));

		services.AddIdentityMongoDbProvider<CookbookUser>(
			identity => 
			{
				identity.Lockout.MaxFailedAccessAttempts = 5;
				identity.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
			},
			mongo =>
			{
				mongo.UsersCollection = "users";
				mongo.MigrationCollection = "users.migrations";
				mongo.ConnectionString = $"{config.ConnectionString}/{config.DatabaseName}";
			});
	}

	public static void AddCookbookServices(this IServiceCollection services)
	{
		services.AddSingleton<IDataAccess, DataAccess>();
		services.AddSingleton<ICategoryQueries, CategoryQueries>();
		services.AddSingleton<IRecipeQueries, RecipeQueries>();
		services.AddSingleton<IImageQueries, ImageQueries>();
	}
}
