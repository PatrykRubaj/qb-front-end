using System;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.ServiceBus;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Logging;
using QuantumBudget;
using Services;
using Services.Mailchimp;

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
            builder.Services.AddSingleton<BusMessageService>();
        }
    }
}