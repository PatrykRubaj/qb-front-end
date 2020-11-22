using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DTO.Mailchimp;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Services.Mailchimp
{
    public class SubscriberService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger<SubscriberService> _log;
        private const string MAILCHIMP_API_URL = "https://us10.api.mailchimp.com/3.0";
        private const string MAILCHIMP_API_KEY = "3e947d08e2eb030b07105baabdf86fba-us10";
        private const string MAILCHIMP_AUDIANCE_ID = "2b10af41f7";
        private const string MAILCHIMP_MARKETING_PERMISSION_ID_FOR_EMAIL = "b59c82458c";
        public SubscriberService(IHttpClientFactory clientFactory, ILogger<SubscriberService> log)
        {
            _clientFactory = clientFactory;
            _log = log;
        }

        public async Task Add(NewSubscriber newSubscriber)
        {
            await AddMemberToMailchimp(newSubscriber);
        }

        public async Task ReconfirmSubscription(NewSubscriber newSubscriber)
        {
            string emailHash = EmailHash(newSubscriber.Email);
            var updateUrl = $"{MAILCHIMP_API_URL}/lists/{MAILCHIMP_AUDIANCE_ID}/members/{emailHash}";

            var updatedMember = new Member()
            {
                Status = "pending",
                Tags = null,
            };

            var json = JsonConvert.SerializeObject(updatedMember, Formatting.Indented, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
            });
            var updatedMemberJson = new StringContent(json, Encoding.UTF8, "application/json");
            _log.LogInformation($"JSON sent with update: {json}");
            var client = GetAuthenticatedClientInstance();
            using var httpResponse = await client.PatchAsync(updateUrl, updatedMemberJson);
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            _log.LogInformation($"Mailchimp update response: {responseAsString}");
        }

        public async Task ReconfirmPending(NewSubscriber newSubscriber)
        {
            string emailHash = EmailHash(newSubscriber.Email);
            var updateUrl = $"{MAILCHIMP_API_URL}/lists/{MAILCHIMP_AUDIANCE_ID}/members/{emailHash}";

            var updatedMember = new Member()
            {
                Status = "unsubscribed",
                Tags = null,
            };

            var json = JsonConvert.SerializeObject(updatedMember, Formatting.Indented, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
            });

            var updatedMemberJson = new StringContent(json, Encoding.UTF8, "application/json");
            _log.LogInformation($"JSON sent with update: {json}");
            var client = GetAuthenticatedClientInstance();
            using var httpResponse = await client.PatchAsync(updateUrl, updatedMemberJson);
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            _log.LogInformation($"Mailchimp update response: {responseAsString}");

            await ReconfirmSubscription(newSubscriber);
        }

        public async Task<SubscriberStatus> MailExists(string email)
        {
            string emailHash = EmailHash(email);
            var getUrl = $"{MAILCHIMP_API_URL}/lists/{MAILCHIMP_AUDIANCE_ID}/members/{emailHash}?fields=id,email_address,status,tags";

            var client = GetAuthenticatedClientInstance();
            using var httpResponse = await client.GetAsync(getUrl);
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            _log.LogInformation($"Mailchimp response: {responseAsString}");
            if (httpResponse.StatusCode == HttpStatusCode.NotFound)
            {
                return SubscriberStatus.DoesNotExist;
            }
            else if (httpResponse.StatusCode == HttpStatusCode.OK)
            {
                var member = JsonConvert.DeserializeObject<Member>(responseAsString);

                return MapStatusToEnum(member.Status);
            }

            return SubscriberStatus.DoesNotExist;
        }

        private SubscriberStatus MapStatusToEnum(string mailchimpStatus)
        {
            switch (mailchimpStatus)
            {
                case "subscribed": return SubscriberStatus.Subscribed;
                case "unsubscribed": return SubscriberStatus.Unsubscribed;
                case "pending": return SubscriberStatus.Pending;
                case "archived": return SubscriberStatus.Archived;
                default: return SubscriberStatus.DoesNotExist;
            }
        }

        private HttpClient GetAuthenticatedClientInstance()
        {
            var client = _clientFactory.CreateClient();
            String encoded = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1").GetBytes($"anystring:{MAILCHIMP_API_KEY}"));
            client.DefaultRequestHeaders.Add("Authorization", $"Basic {encoded}");

            return client;
        }

        private async Task AddMemberToMailchimp(NewSubscriber newSubscriber)
        {
            var newMember = new NewMember()
            {
                EmailAddress = newSubscriber.Email,
                Status = "pending",
                Tags = new List<string>() { newSubscriber.Source },
                MergeFields = new MergeFields()
                {
                    FirstName = newSubscriber.Name,
                },
                MarketingPresmissions = new List<MarketingPermissions>() { new MarketingPermissions(MAILCHIMP_MARKETING_PERMISSION_ID_FOR_EMAIL) },
            };

            var json = JsonConvert.SerializeObject(newMember, Formatting.Indented, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
            });

            _log.LogInformation($"Sent to Mailchimp: {json}");

            var newMemberJson = new StringContent(json, Encoding.UTF8, "application/json");

            var client = GetAuthenticatedClientInstance();
            var createUrl = $"{MAILCHIMP_API_URL}/lists/{MAILCHIMP_AUDIANCE_ID}/members";

            using var httpResponse = await client.PostAsync(createUrl, newMemberJson);
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            _log.LogInformation($"Response from Mailchimp: {responseAsString}");
        }

        private string NormalizeEmail(string email)
        {
            return email.ToLower();
        }

        private string EmailHash(string email)
        {
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(NormalizeEmail(email));
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }
    }
}