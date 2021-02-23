using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Mailchimp;
using Newtonsoft.Json;
using Azure.Storage.Queues;

namespace QuantumBudget.Services
{
    public class QueueMessageService<T>
    {
        private readonly string _serviceBusConnectionString;
        private readonly QueueClient _queueClient;
        
        public QueueMessageService(string queueName)
        {
            _serviceBusConnectionString = Environment.GetEnvironmentVariable("AzureWebJobsMailchimpServiceQueue");
            _queueClient = new QueueClient(_serviceBusConnectionString, queueName);
        }
        
        public async Task SendMessageAsync(T messageToSend)
        {
            string jsonString = JsonConvert.SerializeObject(messageToSend);
            var encodedBytes = Encoding.UTF8.GetBytes(jsonString);
            var base64Encoded = Convert.ToBase64String(encodedBytes);
            var message = new BinaryData(base64Encoded);

            await _queueClient.SendMessageAsync(message);
        }
    }
}
//docker run -p 10000:10000 -p 10001:10001 mcr.microsoft.com/azure-storage/azurite azurite --oauth basic --cert cert.pem --key key.pem