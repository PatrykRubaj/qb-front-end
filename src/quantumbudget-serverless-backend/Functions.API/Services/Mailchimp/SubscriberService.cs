using System;
using System.Threading.Tasks;
using Functions.API.Repositories;
using Functions.Model.DTOs.Mailchimp;
using Microsoft.Extensions.Logging;

namespace Services.Mailchimp
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

        public async Task ReconfirmSubscriptionAsync(NewSubscriber newSubscriber)
        {
            var updatedMember = new Member()
            {
                Status = "pending",
                Tags = null,
            };

            await _mailchimpRepository.UpdateMemberAsync(newSubscriber.Email, updatedMember);
        }

        public async Task ReconfirmPendingAsync(NewSubscriber newSubscriber)
        {
            var updatedMember = new Member()
            {
                Status = "unsubscribed",
                Tags = null,
            };
            await _mailchimpRepository.UpdateMemberAsync(newSubscriber.Email, updatedMember);

            await ReconfirmSubscriptionAsync(newSubscriber);
        }

        private async Task<SubscriberStatus> GetEmailStatusAsync(string email)
        {
            var member = await _mailchimpRepository.GetMemberAsync(email);

            return MapStatusToEnum(member?.Status);
        }

        public SubscriberStatus MapStatusToEnum(string mailchimpStatus)
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

        private async Task AddMemberToMailchimpAsync(NewSubscriber newSubscriber)
        {
            await _mailchimpRepository.AddMemberAsync(newSubscriber);
        }

        public async Task HandleMemberSubscriptionAsync(NewSubscriber userToSubscribe)
        {
            var mailchimpSubscriptionStatus = await GetEmailStatusAsync(userToSubscribe.Email);

            if (mailchimpSubscriptionStatus == SubscriberStatus.DoesNotExist)
            {
                await AddMemberToMailchimpAsync(userToSubscribe);
            }
            else if (mailchimpSubscriptionStatus == SubscriberStatus.Archived ||
                     mailchimpSubscriptionStatus == SubscriberStatus.Unsubscribed)
            {
                await ReconfirmSubscriptionAsync(userToSubscribe);
            }
            else if (mailchimpSubscriptionStatus == SubscriberStatus.Pending)
            {
                await ReconfirmPendingAsync(userToSubscribe);
            }
        }
    }
}