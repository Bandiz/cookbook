using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record InstructionRequestModel([property: Required] string Description);
