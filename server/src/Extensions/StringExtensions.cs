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
}
