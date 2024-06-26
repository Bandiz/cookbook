using MongoDBMigrations;
using System.Reflection;

var migrationEngine = new MigrationEngine()
    .UseDatabase("mongodb://localhost:27017", "cookbook")
    .UseAssembly(Assembly.GetExecutingAssembly())
    .UseSchemeValidation(false);


migrationEngine.Run();



    
