using System;
using System.Threading.Tasks;
using DTO.Mailchimp;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Services.Mailchimp;

namespace QuantumBudget
{
    public class SubscribeUserToMailchimp
    {
        private readonly SubscriberService _subscriberService;

        public SubscribeUserToMailchimp(SubscriberService subscriberService)
        {
            _subscriberService = subscriberService;
        }

        [FunctionName("SubscribeUserToMailchimp")]
        public async Task Run([QueueTrigger("mailchimp-subscriptions", Connection = "AzureWebJobsMailchimpServiceQueue")] NewSubscriber myQueueItem, ILogger log)
        {
            log.LogInformation($"C# ServiceBus queue trigger function processed message: {JsonConvert.SerializeObject(myQueueItem)}");
            var mailchimpSubscriptionStatus = await _subscriberService.MailExists(myQueueItem.Email);

            if (mailchimpSubscriptionStatus == SubscriberStatus.DoesNotExist)
            {
                await _subscriberService.Add(myQueueItem);
            }
            else if (mailchimpSubscriptionStatus == SubscriberStatus.Archived || mailchimpSubscriptionStatus == SubscriberStatus.Unsubscribed)
            {
                await _subscriberService.ReconfirmSubscription(myQueueItem);
            }
            else if (mailchimpSubscriptionStatus == SubscriberStatus.Pending)
            {
                await _subscriberService.ReconfirmPending(myQueueItem);
            }
        }
    }
}
