﻿using System.Threading.Tasks;
using Cookbook.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers
{
	[Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService imageService;

        public ImageController(IImageService imageService)
        {
            this.imageService = imageService;
        }

		[Authorize(Roles = "Admin")]
		[HttpPost]
		public async Task<IActionResult> UploadImage(IFormFile file)
		{
			var recipe = await imageService.UploadImage(file.OpenReadStream(), file.FileName);

			return Ok(recipe);
		}

		[AllowAnonymous]
		[HttpGet("{id}")]
		public async Task<IActionResult> GetImage(string id)
		{
			var (imageStream, filename) = await imageService.GetImage(id);

			return File(imageStream.ToArray(), GetContentType(filename));
		}

		private static string GetContentType(string filename)
		{
			if (filename.EndsWith(".jpg") || filename.EndsWith(".jpeg"))
				return "image/jpeg";
			else if (filename.EndsWith(".png"))
				return "image/png";
			else if (filename.EndsWith(".gif"))
				return "image/gif";
			else
				return "application/octet-stream"; // Default to binary data
		}

	}
}
