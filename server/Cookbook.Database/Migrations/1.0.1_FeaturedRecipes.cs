using Cookbook.API.Entities;
using MongoDB.Driver;
using MongoDBMigrations;

namespace Cookbook.Database.Migrations;

internal class FeaturedRecipes : IMigration
{
    public MongoDBMigrations.Version Version => new(1, 0, 1);

    public string Name => "Featured recipes";

    public void Down(IMongoDatabase database)
    {
    }

    public void Up(IMongoDatabase database)
    {
        var recipes = database.GetCollection<Recipe>("recipes");

        recipes.UpdateMany(
            Builders<Recipe>.Filter.Empty,
            Builders<Recipe>.Update.Set(x => x.IsFeatured, false));

        var categories = database.GetCollection<Category>("categories");

        categories.UpdateMany(
            Builders<Category>.Filter.Empty,
            Builders<Category>.Update.Set(x => x.IsFeatured, false));
    }
}
