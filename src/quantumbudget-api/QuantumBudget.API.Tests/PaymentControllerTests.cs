using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using QuantumBudget.API.Controllers;
using QuantumBudget.Model.Options;
using QuantumBudget.API.Tests.Options;
using QuantumBudget.API.Tests.Services;
using QuantumBudget.Model.Models;
using QuantumBudget.Services;
using QuantumBudget.Services.Tests.Repositories;
using Xunit;

namespace QuantumBudget.API.Tests
{
    public class PaymentControllerTests
    {
        [Fact]
        public void Test1()
        {
            Assert.Equal(false, true);
        }

        [Fact]
        public async Task Webhook_Returns400_WhenWebhookSecretIsWrong()
        {
            var stripeOptions = new StripeOptionsMock();
            var jwtToken = new JwtToken()
            {
                UserId = "google|patryk1",
                AccessToken = "accessToken",
            };
            IUserManagementService userManagementServiceMock = new UserManagementServiceMock();
            StripePaymentServiceMock stripePaymentServiceMock = new StripePaymentServiceMock();

            StripeEventHandlerService stripeEventHandlerService = new StripeEventHandlerService(userManagementServiceMock, stripeOptions, stripePaymentServiceMock);
                
            var controller = new PaymentsController(jwtToken, stripeEventHandlerService, userManagementServiceMock, null);
            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext()
                {
                    Request =
                    {
                        Headers =
                        {
                            new KeyValuePair<string, StringValues>("Stripe-Signature", "Wrong")
                        }
                    }
                }
            };

            var result = await controller.Webhook();
            
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Webhook_Returns200_WhenWebhookSecretIsCorrect()
        {
            var stripeOptions = new StripeOptionsMock();
            var jwtToken = new JwtToken()
            {
                UserId = "google|patryk1",
                AccessToken = "accessToken",
            };
            UserManagementServiceMock userManagementServiceMock = new UserManagementServiceMock();
            StripePaymentServiceMock stripePaymentServiceMock = new StripePaymentServiceMock();

            StripeEventHandlerService stripeEventHandlerService = new StripeEventHandlerService(userManagementServiceMock, stripeOptions, stripePaymentServiceMock);
                
            var controller = new PaymentsController(jwtToken, stripeEventHandlerService, userManagementServiceMock, null);
            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext()
                {
                    Request =
                    {
                        Headers =
                        {
                            new KeyValuePair<string, StringValues>("Stripe-Signature", "whsec_g6pND8HOaUZaNpk0uUiUlTKzZP8LomW9")
                        }
                    }
                }
            };

            var result = await controller.Webhook();
            
            Assert.IsType<BadRequestResult>(result);
        }
    }
}
