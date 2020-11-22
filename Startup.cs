using System;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Logging;
using QuantumBudget;
using Services;
using Services.Mailchimp;
using Azure.Storage.Queues;

[assembly: FunctionsStartup(typeof(Startup))]
namespace QuantumBudget
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddHttpClient();
            builder.Services.AddLogging();

            builder.Services.AddScoped<SubscriberService>();
            builder.Services.AddSingleton<QueueMessageService>();

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
            }
        }
    }
}