using System;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Logging;
using Functions.API;
using Services;
using Services.Mailchimp;
using Azure.Storage.Queues;
using Functions.Model.Models;

[assembly: FunctionsStartup(typeof(Startup))]
namespace Functions.API
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddHttpClient();
            builder.Services.AddLogging();

            builder.Services.AddScoped<SubscriberService>();
            builder.Services.AddScoped<TokenValidationService>();
            builder.Services.AddScoped<AzureADJwtBearerValidation>();
            builder.Services.AddSingleton<QueueMessageService>(provider => new QueueMessageService());
            builder.Services.AddSingleton<IBudgetsDatabaseSettings>(GetMongoDBSettings());
            builder.Services.AddSingleton<IBudgetsService, BudgetsService>();
            
            CreateQueuesForDevelopment();
        }

        private void CreateQueuesForDevelopment()
        {
            string connectionString = Environment.GetEnvironmentVariable("AzureWebJobsMailchimpServiceQueue");
            string env = Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT") ?? "Production"; // set to "Development" locally

            if (env == "Development" && String.IsNullOrWhiteSpace(connectionString) == false)
            {
                // Instantiate a QueueClient which will be used to create and manipulate the queue
                var queueClient = new Azure.Storage.Queues.QueueClient(connectionString, "mailchimp-subscriptions");
                // Create the queue
                queueClient.CreateIfNotExists();

                var queueClient2 = new Azure.Storage.Queues.QueueClient(connectionString, "users-budgets");
                // Create the queue
                queueClient2.CreateIfNotExists();
            }
        }

        private BudgetsDatabaseSettings GetMongoDBSettings()
        {
            var databaseSettings = new BudgetsDatabaseSettings()
            {
                BudgetsCollectionName = Environment.GetEnvironmentVariable("MongoDBBudgetsCollectionName"),
                MongoDBConnectionString = Environment.GetEnvironmentVariable("MongoDBConnectionString"),
                DatabaseName = Environment.GetEnvironmentVariable("MongoDBDatabaseName"),
            };

            return databaseSettings;
        }
    }
}