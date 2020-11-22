using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DTO.Mailchimp;
using Newtonsoft.Json;
using Azure.Storage.Queues;

namespace Services
{
    public class QueueMessageService
    {
        private readonly string _serviceBusConnectionString;
        const string QueueName = "mailchimp-subscriptions";
        private readonly QueueClient _queueClient;

        public QueueMessageService()
        {
            _serviceBusConnectionString = Environment.GetEnvironmentVariable("AzureWebJobsMailchimpServiceQueue");
            _queueClient = new QueueClient(_serviceBusConnectionString, QueueName);
        }

        public async Task SendMessage(NewSubscriber newSubscriber)
        {
            string jsonString = JsonConvert.SerializeObject(newSubscriber);
            var encodedBytes = Encoding.UTF8.GetBytes(jsonString);
            var base64Encoded = System.Convert.ToBase64String(encodedBytes);
            var message = new BinaryData(base64Encoded);

            await _queueClient.SendMessageAsync(message);
        }
    }
}
//docker run -p 10000:10000 -p 10001:10001 mcr.microsoft.com/azure-storage/azurite azurite --oauth basic --cert cert.pem --key key.pem