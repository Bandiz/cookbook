using System.Reflection;
using MongoDB.Bson.Serialization.Conventions;
using MongoDBMigrations;

var migrationEngine = new MigrationEngine()
    .UseDatabase("mongodb://localhost:27017", "cookbook")
    .UseAssembly(Assembly.GetExecutingAssembly())
    .UseSchemeValidation(false);


var conventionPack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("camelCase", conventionPack, t => true);

migrationEngine.Run();