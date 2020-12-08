using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;

namespace Functions.API
{
    public class GetBudget
    {
        private readonly IBudgetsService _budgetsService;
        private readonly TokenValidationService _tokenValidationService;
        private readonly AzureADJwtBearerValidation _verificator;


        public GetBudget(IBudgetsService budgetsService, TokenValidationService tokenValidationService,
            AzureADJwtBearerValidation verificator)
        {
            _budgetsService = budgetsService;
            _tokenValidationService = tokenValidationService;
            _verificator = verificator;
        }

        [FunctionName("GetBudget")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetBudget/{userId}")]
            HttpRequest req,
            string userId,
            ILogger log)
        {
            bool gotValue = req.Headers.TryGetValue("Authorization", out var accessToken);

            if (gotValue == false)
            {
                return new ObjectResult("Please go away")
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
            }

            var claimsPrincipal = await _verificator.ValidateTokenAsync(accessToken.FirstOrDefault());

            if (claimsPrincipal.Claims.FirstOrDefault(x =>
                x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value == userId)
            {
                var budget = await _budgetsService.GetByUserId(userId);

                if (budget != null)
                {
                    return new OkObjectResult(budget);
                }

                return new NotFoundResult();
            }

            return new ObjectResult("Please go away")
            {
                StatusCode = StatusCodes.Status401Unauthorized
            };
        }
    }
}