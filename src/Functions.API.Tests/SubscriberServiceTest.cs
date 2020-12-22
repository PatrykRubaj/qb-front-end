using System;
using System.Linq;
using System.Threading.Tasks;
using Functions.API.Tests.Repositories;
using Functions.Model.DTOs.Mailchimp;
using Microsoft.Extensions.Logging.Abstractions;
using Services.Mailchimp;
using Xunit;

namespace Functions.API.Tests
{
    public class SubscriberServiceTest
    {
        [Fact]
        public async Task HandleMemberSubscriptionAsync_NewSubscriber_ShouldBeAddedToEmailsServiceWithStatusPending()
        {
            //arrange
            var nullLogger = new NullLogger<SubscriberService>();
            var fakeRepository = new FakeMailchimpRepository();
            var subscriberService = new SubscriberService(nullLogger, fakeRepository);
            var newSubscriber = new NewSubscriber()
            {
                Email = "new@example.org",
                Name = "Marek",
                Source = "UnitTest"
            };

            //act
            await subscriberService.HandleMemberSubscriptionAsync(newSubscriber);
            Member receivedMember = await fakeRepository.GetMemberAsync(newSubscriber.Email);

            //assert
            Assert.Equal(newSubscriber.Email, receivedMember.EmailAddress);
            Assert.Equal("pending", receivedMember.Status);
        }

        [Fact]
        public async Task HandleMemberSubscriptionAsync_ArchivedSubscriber_ShouldBeResubscribedWithStatusPending()
        {
            //arrange
            var nullLogger = new NullLogger<SubscriberService>();
            var fakeRepository = new FakeMailchimpRepository();
            var subscriberService = new SubscriberService(nullLogger, fakeRepository);
            var archivedSubscriber = new NewSubscriber()
            {
                Email = "archived@example.org",
                Name = "Archived",
                Source = "UnitTest"
            };

            //assume
            Assume.That(
                fakeRepository.Members.FirstOrDefault(x => x.Key == archivedSubscriber.Email).Value.LastOrDefault()?.Status ==
                "archived", "Missing archived member in the collection");

            //act
            await subscriberService.HandleMemberSubscriptionAsync(archivedSubscriber);
            Member receivedMember = await fakeRepository.GetMemberAsync(archivedSubscriber.Email);

            //assert
            Assert.Equal(archivedSubscriber.Email, receivedMember.EmailAddress);
            Assert.Equal("pending", receivedMember.Status);
        }
        
        [Fact]
        public async Task HandleMemberSubscriptionAsync_Pending_ShouldBeChangedByEmailsServiceToUnsubscribedThanPending()
        {
            //arrange
            var nullLogger = new NullLogger<SubscriberService>();
            var fakeRepository = new FakeMailchimpRepository();
            var subscriberService = new SubscriberService(nullLogger, fakeRepository);
            var newSubscriber = new NewSubscriber()
            {
                Email = "pending@example.org",
                Name = "Marek",
                Source = "UnitTest"
            };

            //act
            await subscriberService.HandleMemberSubscriptionAsync(newSubscriber);
            Member receivedMember = await fakeRepository.GetMemberAsync(newSubscriber.Email);
            var memberHistory = fakeRepository.Members["pending@example.org"];
            
            //assert
            Assert.Equal(3, memberHistory.Count);
            Assert.Equal(newSubscriber.Email, receivedMember.EmailAddress);
            Assert.Equal("unsubscribed", memberHistory.ElementAt(1).Status);
            Assert.Equal("pending", receivedMember.Status);
        }
        
        [Fact]
        public async Task HandleMemberSubscriptionAsync_UnsubscribedSubscriber_ShouldBeResubscribedWithStatusPending()
        {
            //arrange
            var nullLogger = new NullLogger<SubscriberService>();
            var fakeRepository = new FakeMailchimpRepository();
            var subscriberService = new SubscriberService(nullLogger, fakeRepository);
            var unsubscribedSubscriber = new NewSubscriber()
            {
                Email = "unsubscribed@example.org",
                Name = "Unsubscribed",
                Source = "UnitTest"
            };

            //assume
            var assumedMember = await fakeRepository.GetMemberAsync(unsubscribedSubscriber.Email);
            Assume.That(
                    assumedMember?.Status ==
                "unsubscribed", "Missing unsubscribed member in the collection");

            //act
            await subscriberService.HandleMemberSubscriptionAsync(unsubscribedSubscriber);
            Member receivedMember = await fakeRepository.GetMemberAsync(unsubscribedSubscriber.Email);

            //assert
            Assert.Equal(unsubscribedSubscriber.Email, receivedMember.EmailAddress);
            Assert.Equal("pending", receivedMember.Status);
        }
        
        [Fact]
        public async Task HandleMemberSubscriptionAsync_AlreadySubscribed_ShouldBeNotChanged()
        {
            //arrange
            var nullLogger = new NullLogger<SubscriberService>();
            var fakeRepository = new FakeMailchimpRepository();
            var subscriberService = new SubscriberService(nullLogger, fakeRepository);
            var subscribedSubscriber = new NewSubscriber()
            {
                Email = "subscribed@example.org",
                Name = "Subscribed",
                Source = "UnitTest"
            };

            //assume
            var assumedMember = await fakeRepository.GetMemberAsync(subscribedSubscriber.Email);
            Assume.That(
                    assumedMember?.Status ==
                "subscribed", "Missing subscribed member in the collection");

            //act
            await subscriberService.HandleMemberSubscriptionAsync(subscribedSubscriber);
            Member receivedMember = await fakeRepository.GetMemberAsync(subscribedSubscriber.Email);
            var memberChanges = fakeRepository.Members["subscribed@example.org"];
            
            //assert
            Assert.Single(memberChanges);
            Assert.Equal(subscribedSubscriber.Email, receivedMember.EmailAddress);
            Assert.Equal("subscribed", receivedMember.Status);
        }
    }
}