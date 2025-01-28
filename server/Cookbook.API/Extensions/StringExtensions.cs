using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;

namespace Cookbook.API.Extensions;

public static class StringExtensions
{
	public static string CapitalizeFirstLetter(this string value)
	{
		if (string.IsNullOrEmpty(value))
		{
			return string.Empty;
		}

		return char.ToUpper(value[0]) + value[1..];
	}

	public static (List<ObjectId>, List<string>) ParseImageIds(
		this IEnumerable<string> imagesToCheck)
	{
		HashSet<ObjectId> parsedImageIds = [];
		List<string> failedParsedIds = [];

		var imagesIds = new List<string>(imagesToCheck)
			.Where(x => !string.IsNullOrEmpty(x));

		foreach (var imageId in imagesIds)
		{
			if (!ObjectId.TryParse(imageId, out var parsedId))
			{
				failedParsedIds.Add(imageId);
				continue;
			}

			parsedImageIds.Add(parsedId);
		}

		return (parsedImageIds.ToList(), failedParsedIds);
	}
}
