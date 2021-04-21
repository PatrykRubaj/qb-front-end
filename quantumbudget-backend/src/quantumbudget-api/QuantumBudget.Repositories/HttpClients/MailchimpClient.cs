using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using QuantumBudget.Model.DTOs.Mailchimp;
using QuantumBudget.Model.Options;

namespace QuantumBudget.Repositories.HttpClients
{
    public class MailchimpClient
    {
        private readonly HttpClient _httpClient;
        private readonly MailchimpConfiguration _mailchimpConfiguration;

        public MailchimpClient(HttpClient httpClient, IOptions<MailchimpConfiguration> mailchimpConfiguration)
        {
            _httpClient = httpClient;
            _mailchimpConfiguration = mailchimpConfiguration.Value;
            _httpClient.BaseAddress = new Uri(_mailchimpConfiguration.ApiUrl);

            String encodedToken = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1")
                .GetBytes($"anystring:{_mailchimpConfiguration.ApiKey}"));
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Basic {encodedToken}");
        }

        public async Task AddMemberAsync(NewMemberDto newMember)
        {
            var json = JsonConvert.SerializeObject(newMember, Formatting.Indented, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
            });

            var newMemberJson = new StringContent(json, Encoding.UTF8, "application/json");

            var createUrl = $"/lists/{_mailchimpConfiguration.AudienceId}/members";

            using var httpResponse = await _httpClient.PostAsync(createUrl, newMemberJson);
        }

        public async Task<MemberDto> GetMemberAsync(string hashedEmail)
        {
            var getUrl =
                $"/lists/{_mailchimpConfiguration.AudienceId}/members/{hashedEmail}?fields=id,email_address,status,tags";

            using var httpResponse = await _httpClient.GetAsync(getUrl);

            if (httpResponse.StatusCode == HttpStatusCode.NotFound)
            {
                return null;
            }

            var responseAsString = await httpResponse.Content.ReadAsStringAsync();

            var member = JsonConvert.DeserializeObject<MemberDto>(responseAsString);
            return member;
        }

        public async Task UpdateMemberAsync(string hashedEmail, MemberDto updatedMember)
        {
            var updateUrl = $"/lists/{_mailchimpConfiguration.AudienceId}/members/{hashedEmail}";
            var json = JsonConvert.SerializeObject(updatedMember, Formatting.Indented, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
            });
            var updatedMemberJson = new StringContent(json, Encoding.UTF8, "application/json");

            using var httpResponse = await _httpClient.PatchAsync(updateUrl, updatedMemberJson);
        }
    }
}