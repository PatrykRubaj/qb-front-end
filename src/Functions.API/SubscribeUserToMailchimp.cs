using System;
using System.Linq;
using System.Threading.Tasks;
using Functions.Model.DTOs.Mailchimp;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Services;
using Services.Mailchimp;

namespace Functions.API
{
    public class SubscribeUserToMailchimp
    {
        private readonly SubscriberService _subscriberService;
        private readonly UserManagementService _userManagementService;

        public SubscribeUserToMailchimp(SubscriberService subscriberService, UserManagementService userManagementService)
        {
            _subscriberService = subscriberService;
            _userManagementService = userManagementService;
        }

        [FunctionName("SubscribeUserToMailchimp")]
        public async Task Run([QueueTrigger("mailchimp-subscriptions", Connection = "AzureWebJobsMailchimpServiceQueue")] NewSubscriber userToSubscribe, ILogger log)
        {
            log.LogInformation($"C# ServiceBus queue trigger function processed message: {JsonConvert.SerializeObject(userToSubscribe)}");

            await _subscriberService.HandleMemberSubscriptionAsync(userToSubscribe);
        }
    }
}
