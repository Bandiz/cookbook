using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Cookbook.API.Services.Interfaces;

public interface IImageService
{
	Task<string> UploadImage(Stream fs, string filename);

	Task<(MemoryStream, string)> GetImage(string id);

	Task<string[]> GetImageIds();

	Task<List<string>> CheckExistingImages(List<string> imageIds);
}
