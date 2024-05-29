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
			identity => { },
			mongo =>
			{
				mongo.ConnectionString = $"{config.ConnectionString}/{config.DatabaseName}";
			});
	}

	public static void AddCookbookServices(this IServiceCollection services)
	{
		services.AddSingleton<IDataAccess, DataAccess>();
		services.AddSingleton<ICategoryService, CategoryService>();
		services.AddSingleton<IRecipeService, RecipeService>();
		services.AddSingleton<IImageService, ImageService>();
	}
}
