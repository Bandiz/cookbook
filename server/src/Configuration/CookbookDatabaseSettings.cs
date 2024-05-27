namespace Cookbook.API.Configuration;

public class CookbookDatabaseSettings
{
	public string ConnectionString { get; set; }
	public string DatabaseName { get; set; }
	public string CounterCollectionName { get; set; }
	public string RecipeCollectionName { get; set; }
	public string CategoryCollectionName { get; set; }
	public string ImageCollectionName { get; set; }
	public string ImageBucketName { get; set; }
}
