using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Cookbook.API.Services.Interfaces;

public interface IImageService
{
	Task<string> UploadImage(Stream fs, string filename);

	Task<(MemoryStream, string)> GetImage(ObjectId imageId);

	Task<string[]> GetImageIds();

	Task DeleteImage(ObjectId imageId);

	Task<List<string>> CheckExistingImages(List<ObjectId> imageIds);
}
