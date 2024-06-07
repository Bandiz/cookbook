using System.Collections.Generic;

namespace Cookbook.API.Models.Image;

public record UploadImagesResponseModel(List<string> ImageIds, List<string> Warnings);
