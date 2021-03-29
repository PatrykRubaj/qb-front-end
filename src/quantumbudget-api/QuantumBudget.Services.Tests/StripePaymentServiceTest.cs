using System;
using System.Linq;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Model.Mappers;
using QuantumBudget.Services.Tests.Repositories;
using QuantumBudget.Services.Tests.Services;
using Xunit;

namespace QuantumBudget.Services.Tests
{
    public class StripePaymentServiceTest
    {
        // [Fact]
        // public async Task WhenCreatingCustomer_CustomerShouldntHaveAnySubscritpions()
        // {
        //     //Arrange
        //     var stripeCustomerRepositoryMock = new StripeCustomerRepositoryMock();
        //     var stripeCheckoutSessionRepositoryMock = new StripeCheckoutSessionRepositoryMock();
        //     var stripeBillingPortalSessionRepositoryMock = new StripeBillingPortalSessionRepositoryMock();
        //     var userManagementServiceMock = new UserManagementServiceMock();
        //     var priceNameToIdMapper = new DevPriceNameToIdMapper();
        //
        //     StripePaymentService stripePaymentService = new StripePaymentService(stripeCustomerRepositoryMock,
        //         stripeCheckoutSessionRepositoryMock, stripeBillingPortalSessionRepositoryMock,
        //         userManagementServiceMock, priceNameToIdMapper);
        //
        //     var auth0UserId = "google-oauth2|00004";
        //     var name = "Patryk Tester";
        //     var email = "patryk4@test.com";
        //     var newCustomer = new CreateCustomerDto(auth0UserId, name, email);
        //
        //     //Act
        //     var createdCustomer = await stripePaymentService.CreateCustomerAsync(newCustomer);
        //     var retrievedCustomer = await stripePaymentService.GetCustomerAsync(createdCustomer.Id);
        //
        //     //Assert
        //     Assert.NotNull(createdCustomer);
        //     Assert.NotNull(retrievedCustomer);
        //     Assert.Equal(auth0UserId, retrievedCustomer.Auth0Id);
        //     Assert.Null(retrievedCustomer.Subscription);
        //     
        //     var auth0User = userManagementServiceMock.Users.First(x => x.UserId == auth0UserId);
        //     Assert.Equal(retrievedCustomer.Id, auth0User.AppMetadata.StripeCustomerId);
        //     Assert.Null(auth0User.AppMetadata.SubscriptionPlan);
        // }
        
        // [Fact]
        // public async Task WhenCreatingCustomer_UpdateAppMetadataInAuth0()
        // {
        //     //Arrange
        //     var stripeCustomerRepositoryMock = new StripeCustomerRepositoryMock();
        //     var stripeCheckoutSessionRepositoryMock = new StripeCheckoutSessionRepositoryMock();
        //     var stripeBillingPortalSessionRepositoryMock = new StripeBillingPortalSessionRepositoryMock();
        //     var userManagementServiceMock = new UserManagementServiceMock();
        //     var priceNameToIdMapper = new DevPriceNameToIdMapper();
        //
        //     StripePaymentService stripePaymentService = new StripePaymentService(stripeCustomerRepositoryMock,
        //         stripeCheckoutSessionRepositoryMock, stripeBillingPortalSessionRepositoryMock,
        //         userManagementServiceMock, priceNameToIdMapper);
        //
        //     var auth0UserId = "google-oauth2|00004";
        //     var name = "Patryk Tester";
        //     var email = "patryk4@test.com";
        //     var newCustomer = new CreateCustomerDto(auth0UserId, name, email);
        //
        //     //Act
        //     var createdCustomer = await stripePaymentService.CreateCustomerAsync(newCustomer);
        //     var retrievedCustomer = await stripeCustomerRepositoryMock.GetAsync(createdCustomer.Id);
        //
        //     //Assert
        //     Assert.NotNull(createdCustomer);
        //     Assert.NotNull(retrievedCustomer);
        //     Assert.Equal(auth0UserId, retrievedCustomer.Metadata["auth0UserId"]);
        //
        //     var auth0User = userManagementServiceMock.Users.First(x => x.UserId == auth0UserId);
        //     Assert.Equal(retrievedCustomer.Id, auth0User.AppMetadata.StripeCustomerId);
        //     Assert.Null(auth0User.AppMetadata.SubscriptionPlan);
        // }

        [Fact]
        public async Task WhenFetchingUserWithoutSubscription_SubscriptionField_ShouldBeNull()
        {
            //Arrange
            var stripeCustomerRepositoryMock = new StripeCustomerRepositoryMock();
            var stripeCheckoutSessionRepositoryMock = new StripeCheckoutSessionRepositoryMock();
            var stripeBillingPortalSessionRepositoryMock = new StripeBillingPortalSessionRepositoryMock();
            var userManagementServiceMock = new UserManagementServiceMock();
            var priceNameToIdMapper = new DevPriceNameToIdMapper();

            StripePaymentService stripePaymentService = new StripePaymentService(stripeCustomerRepositoryMock,
                stripeCheckoutSessionRepositoryMock, stripeBillingPortalSessionRepositoryMock,
                userManagementServiceMock, priceNameToIdMapper);

            var idOfCustomerWithoutSubscription = "cus_id2";
            
            //Act
            var customer = await stripePaymentService.GetCustomerAsync(idOfCustomerWithoutSubscription);
            
            //Assert
            Assert.Null(customer.Subscription);
        } 
        
        [Fact]
        public async Task WhenFetchingUserWithSubscription_SubscriptionField_ShouldBeInitialized()
        {
            //Arrange
            var stripeCustomerRepositoryMock = new StripeCustomerRepositoryMock();
            var stripeCheckoutSessionRepositoryMock = new StripeCheckoutSessionRepositoryMock();
            var stripeBillingPortalSessionRepositoryMock = new StripeBillingPortalSessionRepositoryMock();
            var userManagementServiceMock = new UserManagementServiceMock();
            var priceNameToIdMapper = new DevPriceNameToIdMapper();

            StripePaymentService stripePaymentService = new StripePaymentService(stripeCustomerRepositoryMock,
                stripeCheckoutSessionRepositoryMock, stripeBillingPortalSessionRepositoryMock,
                userManagementServiceMock, priceNameToIdMapper);

            var idOfCustomerWithSubscription = "cus_id3";
            var subscriptionId = "sub_3";
            var subscriptionStatus = "active";

            //Act
            var customer = await stripePaymentService.GetCustomerAsync(idOfCustomerWithSubscription);
            
            //Assert
            Assert.NotNull(customer);
            Assert.NotNull(customer.Subscription);
            Assert.Equal(subscriptionId, customer.Subscription.Id);
            Assert.Equal(subscriptionStatus, customer.Subscription.Status);
            Assert.Equal(idOfCustomerWithSubscription, customer.Subscription.CustomerId);
        } 
    }
}