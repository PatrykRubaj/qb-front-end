using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DTO.Mailchimp;
using Microsoft.Azure.ServiceBus;
using Newtonsoft.Json;

namespace Services
{
    public class BusMessageService
    {
        private readonly string _serviceBusConnectionString;
        const string QueueName = "mailchimp-subscriptions";
        private readonly IQueueClient _queueClient;

        public BusMessageService()
        {
            _serviceBusConnectionString = Environment.GetEnvironmentVariable("AzureWebJobsMailchimpServiceQueue");
            _queueClient = new QueueClient(_serviceBusConnectionString, QueueName);
        }

        public async Task SendMessage(NewSubscriber newSubscriber)
        {
            var message = new Message(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(newSubscriber)));
            await _queueClient.SendAsync(message);
        }
    }
}