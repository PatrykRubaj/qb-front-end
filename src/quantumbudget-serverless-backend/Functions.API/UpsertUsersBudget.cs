using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuantumBudget.Services;
using QuantumBudget.Model;
using QuantumBudget.Model.Models;

namespace Functions.API
{
    public class UpsertUsersBudget
    {
        private readonly IBudgetsService _budgetsService;
        private readonly JwtBearerValidation _verificator;

        public UpsertUsersBudget(IBudgetsService budgetsService, JwtBearerValidation verificator)
        {
            _budgetsService = budgetsService;
            _verificator = verificator;
        }

        [FunctionName("UpsertUsersBudget")]
        public async Task Run([QueueTrigger("users-budgets", Connection = "AzureWebJobsMailchimpServiceQueue")]
            Budget budget, ILogger log)
        {
            log.LogInformation($"UpsertUsersBudget queue message: {JsonConvert.SerializeObject(budget)}");

            if (budget != null)
            {
                await _budgetsService.Update(budget);
            }
        }
    }
}