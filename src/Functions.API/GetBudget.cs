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

        public GetBudget(IBudgetsService budgetsService)
        {
            _budgetsService = budgetsService;
        }

        [FunctionName("GetBudget")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetBudget/{userId}")] HttpRequest req, 
            string userId,
            ILogger log)
        {
            var budget = await _budgetsService.GetByUserId(userId);

            if (budget != null)
            {
                return new OkObjectResult(budget);
            }

            return new NotFoundResult();
        }
    }
}
