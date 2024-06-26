using Cookbook.API.Entities;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDBMigrations;

namespace Cookbook.Database.Migrations;

internal class InitialMigration : IMigration
{
    public MongoDBMigrations.Version Version => new(1, 0, 0);

    public string Name => "Initial Migration";

    public void Down(IMongoDatabase database)
    {
    }

    public void Up(IMongoDatabase database)
    {
        var collectionsNames = database.ListCollectionNames().ToList();

        if (!collectionsNames.Contains("recipes"))
        {
            database.CreateCollection("recipes");
        }

        var recipesCollection = database.GetCollection<Recipe>("recipes");

        recipesCollection.Indexes.DropAll();

        var titleIndexDefinition = Builders<Recipe>.IndexKeys
            .Text(x => x.Title)
            .Text(x => x.Description)
            .Text(x => x.Categories)
            .Text("instructions.description")
            .Text("ingredients.name");
        recipesCollection.Indexes.CreateOne(
            new CreateIndexModel<Recipe>(titleIndexDefinition,
            new CreateIndexOptions
            {
                Name = "TextIndex"
            }
        ));

        if (!collectionsNames.Contains("counters"))
        {
            database.CreateCollection("counters");
        }

        var counters = database.GetCollection<Counter>("counters");
        var counter = counters.Find(x => x.Id == "recipe").FirstOrDefault();

        if (counter == null)
        {
            counters.InsertOne(new Counter
            {
                Id = "recipe",
                Sequence = 0
            });
        }

        if (!collectionsNames.Contains("categories"))
        {
            database.CreateCollection("categories");
        }

        if (!collectionsNames.Contains("users"))
        {
            database.CreateCollection("users");
        }

        var usersJson = File.ReadAllText("Data/users.json");
        var deserializedUsers = BsonSerializer.Deserialize<List<CookbookUser>>(usersJson);
        var usersCollection = database.GetCollection<CookbookUser>("users");

        foreach (var user in deserializedUsers)
        {
            usersCollection.ReplaceOne(
                x => x.Id == user.Id,
                user,
                new ReplaceOptions() { IsUpsert = true }
            );
        }

    }
}
