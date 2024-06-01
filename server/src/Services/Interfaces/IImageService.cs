using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Cookbook.API.Services.Interfaces;

public interface IImageService
{
	Task<string> UploadImage(Stream fs, string filename, int? recipeId = null, List<string> categories = null);

	Task<(MemoryStream, string)> GetImage(ObjectId imageId);

	Task<string[]> GetImageIds();

	Task DeleteImage(ObjectId imageId);

	Task<List<string>> CheckExistingImages(List<ObjectId> imageIds);

	Task SetMetadata<T>(ObjectId imageId, string metadataKey, T metadataValue);

	Task RemoveMetadata<T>(ObjectId imageId, string metadataKey, T metadataValue);
}
