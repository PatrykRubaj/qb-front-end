using System;
using System.Threading.Tasks;
using QuantumBudget.Repositories;
using QuantumBudget.Model.DTOs.Mailchimp;
using Microsoft.Extensions.Logging;

namespace QuantumBudget.Services.Mailchimp
{
    public class SubscriberService
    {
        private readonly ILogger<SubscriberService> _log;
        private readonly IMailchimpRepository _mailchimpRepository;

        public SubscriberService(ILogger<SubscriberService> log, IMailchimpRepository mailchimpRepository)
        {
            _log = log;
            _mailchimpRepository = mailchimpRepository ?? throw new ArgumentNullException(nameof(mailchimpRepository));
        }

        public async Task ReconfirmSubscriptionAsync(NewSubscriberDto newSubscriber)
        {
            var updatedMember = new MemberDto()
            {
                Status = "pending",
                Tags = null,
            };

            await _mailchimpRepository.UpdateMemberAsync(newSubscriber.Email, updatedMember);
        }

        public async Task ReconfirmPendingAsync(NewSubscriberDto newSubscriber)
        {
            var updatedMember = new MemberDto()
            {
                Status = "unsubscribed",
                Tags = null,
            };
            await _mailchimpRepository.UpdateMemberAsync(newSubscriber.Email, updatedMember);

            await ReconfirmSubscriptionAsync(newSubscriber);
        }

        private async Task<SubscriberStatusDto> GetEmailStatusAsync(string email)
        {
            var member = await _mailchimpRepository.GetMemberAsync(email);

            return MapStatusToEnum(member?.Status);
        }

        public SubscriberStatusDto MapStatusToEnum(string mailchimpStatus)
        {
            switch (mailchimpStatus)
            {
                case "subscribed": return SubscriberStatusDto.Subscribed;
                case "unsubscribed": return SubscriberStatusDto.Unsubscribed;
                case "pending": return SubscriberStatusDto.Pending;
                case "archived": return SubscriberStatusDto.Archived;
                default: return SubscriberStatusDto.DoesNotExist;
            }
        }

        private async Task AddMemberToMailchimpAsync(NewSubscriberDto newSubscriber)
        {
            await _mailchimpRepository.AddMemberAsync(newSubscriber);
        }

        public async Task HandleMemberSubscriptionAsync(NewSubscriberDto userToSubscribe)
        {
            var mailchimpSubscriptionStatus = await GetEmailStatusAsync(userToSubscribe.Email);

            if (mailchimpSubscriptionStatus == SubscriberStatusDto.DoesNotExist)
            {
                await AddMemberToMailchimpAsync(userToSubscribe);
            }
            else if (mailchimpSubscriptionStatus == SubscriberStatusDto.Archived ||
                     mailchimpSubscriptionStatus == SubscriberStatusDto.Unsubscribed)
            {
                await ReconfirmSubscriptionAsync(userToSubscribe);
            }
            else if (mailchimpSubscriptionStatus == SubscriberStatusDto.Pending)
            {
                await ReconfirmPendingAsync(userToSubscribe);
            }
        }
    }
}