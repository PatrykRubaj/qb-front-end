using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DnsClient.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using QuantumBudget.Model.DTOs.Mailchimp;
using Newtonsoft.Json;
using QuantumBudget.Model.Options;
using QuantumBudget.Repositories.HttpClients;

namespace QuantumBudget.Repositories
{
    public class MailchimpRepository : IMailchimpRepository
    {
        private readonly MailchimpClient _mailchimpClient;
        private readonly string _marketingPermissionIdForEmail;

        public MailchimpRepository(MailchimpClient mailchimpClient,
            IOptions<MailchimpConfiguration> mailchimpConfiguration)
        {
            _mailchimpClient = mailchimpClient;
            _marketingPermissionIdForEmail = mailchimpConfiguration.Value?.MarketingPermissionIdForEmail;
        }

        public async Task AddMemberAsync(NewSubscriberDto newSubscriber)
        {
            var newMember = new NewMemberDto()
            {
                EmailAddress = newSubscriber.Email,
                Status = "pending",
                Tags = new List<string>() {newSubscriber.Source},
                MergeFields = new MergeFieldsDto()
                {
                    FirstName = newSubscriber.Name,
                },
                MarketingPresmissions = new List<MarketingPermissionsDto>()
                    {new(_marketingPermissionIdForEmail)},
            };

            await _mailchimpClient.AddMemberAsync(newMember);
        }

        public async Task<MemberDto> GetMemberAsync(string email)
        {
            string emailHash = EmailHash(email);

            return await _mailchimpClient.GetMemberAsync(emailHash);
        }

        public async Task UpdateMemberAsync(string email, MemberDto updatedMember)
        {
            string emailHash = EmailHash(email);
            await _mailchimpClient.UpdateMemberAsync(emailHash, updatedMember);
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

        private string NormalizeEmail(string email)
        {
            return email.ToLower();
        }
    }
}