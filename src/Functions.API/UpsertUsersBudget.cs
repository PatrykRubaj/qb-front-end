using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Functions.Model.Models;
using Newtonsoft.Json;
using Services;

namespace Functions.API
{
    public class UpsertUsersBudget
    {
        private readonly IBudgetsService _budgetsService;

        public UpsertUsersBudget(IBudgetsService budgetsService)
        {
            _budgetsService = budgetsService;
        }

        [FunctionName("UpsertUsersBudget")]
        public async Task Run([QueueTrigger("users-budgets", Connection = "AzureWebJobsMailchimpServiceQueue")] Budget budget, ILogger log)
        {
            log.LogInformation($"C# ServiceBus queue trigger function processed message: {JsonConvert.SerializeObject(budget)}");

            await _budgetsService.Update(budget);
        }
    }
}
