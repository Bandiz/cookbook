using System;
using System.Collections.Generic;
using System.Linq;
using Cookbook.API.Commands.Image;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Cookbook.API.Validators.Image;

public class UploadImagesCommandValidator : AbstractValidator<UploadImagesCommand>
{
	const int MaxFileSize = 5 * 1024 * 1024; // 5MB
	static readonly IReadOnlyList<string> ValidFileTypes = new List<string>
	{
		"image/jpeg",
		"image/png",
		"image/gif"
	}.AsReadOnly();

	public UploadImagesCommandValidator()
	{
		RuleFor(x => x.User).NotNull().NotEmpty();
		RuleFor(x => x.CategoryName).NotEmpty();
		RuleFor(x => x.Files).NotNull().NotEmpty();
		RuleForEach(x => x.Files)
			.Must(BeAValidFileType).WithMessage("Invalid file type")
			.Must(BeSmallerThan).WithMessage("File is too large");
	}

	private bool BeAValidFileType(IFormFile file)
	{
		return ValidFileTypes.Contains(file.ContentType);
	}

	private bool BeSmallerThan(IFormFile file)
	{
		return file.Length <= MaxFileSize;
	}
}
