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
        [Fact]
        public async Task WhenCreatingCustomer_UpdateAppMetadataInAuth0()
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

            var auth0UserId = "google-oauth2|00004";
            var name = "Patryk Tester";
            var email = "patryk4@test.com";
            var newCustomer = new CreateCustomerDto(auth0UserId, name, email);

            //Act
            var createdCustomer = await stripePaymentService.CreateCustomerAsync(newCustomer);
            var retrievedCustomer = await stripeCustomerRepositoryMock.GetAsync(createdCustomer.Id);

            //Assert
            Assert.NotNull(createdCustomer);
            Assert.NotNull(retrievedCustomer);
            Assert.Equal(auth0UserId, retrievedCustomer.Auth0Id);

            var auth0User = userManagementServiceMock.Users.First(x => x.UserId == auth0UserId);
            Assert.Equal(retrievedCustomer.Id, auth0User.AppMetadata.StripeCustomerId);
            Assert.Null(auth0User.AppMetadata.SubscriptionPlan);
        }
    }
}