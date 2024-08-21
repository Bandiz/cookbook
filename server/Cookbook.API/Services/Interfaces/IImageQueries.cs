using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Cookbook.API.Services.Interfaces;

public interface IImageQueries
{
	Task<(MemoryStream, string)> GetImage(ObjectId imageId);

	Task<(MemoryStream, string)> GetImagePreview(ObjectId imageId);

	Task<string[]> GetImageIds();

	Task<List<string>> CheckExistingImages(List<ObjectId> imageIds);
}
