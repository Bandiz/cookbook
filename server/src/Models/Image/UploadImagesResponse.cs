using System.Collections.Generic;

namespace Cookbook.API.Models.Image;

public record UploadImagesResponse(List<string> ImageIds, List<string> Warnings);
