using System.ComponentModel.DataAnnotations;

namespace Cookbook.API.Models.Recipe;

public record CreateInstructionRequestModel([Required] string Description);
