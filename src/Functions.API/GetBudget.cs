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
        private readonly JwtBearerValidation _verificator;


        public GetBudget(IBudgetsService budgetsService,
            JwtBearerValidation verificator)
        {
            _budgetsService = budgetsService;
            _verificator = verificator;
        }

        [FunctionName("GetBudget")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetBudget/{userId}")]
            HttpRequest req,
            string userId,
            ILogger log)
        {
            req.Headers.TryGetValue("Authorization", out var accessToken);
            
            bool allowAccess = await _verificator.ShouldAllowAccess(accessToken.FirstOrDefault(), userId);

            if (allowAccess)
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