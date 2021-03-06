﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Model.Options;
using QuantumBudget.Repositories.Stripe;
using Stripe;
using Stripe.Checkout;

namespace QuantumBudget.Services
{
    public class StripeEventHandlerService
    {
        private readonly IUserManagementService _userManagementService;
        private readonly IStripePaymentService _stripePaymentService;
        private readonly StripeOptions _stripeOptions;

        public StripeEventHandlerService(IUserManagementService userManagementService,
            IOptions<StripeOptions> stripeOptions, IStripePaymentService stripePaymentService)
        {
            _userManagementService = userManagementService;
            _stripePaymentService = stripePaymentService;
            _stripeOptions = stripeOptions.Value;
        }

        public Event GetValidatedEvent(string json, string stripeSignature)
        {
            try
            {
                Event stripeEvent = EventUtility.ConstructEvent(
                    json,
                    stripeSignature,
                    _stripeOptions.WebhookSecret
                );
                Console.WriteLine($"Webhook notification with type: {stripeEvent.Type} found for {stripeEvent.Id}");

                return stripeEvent;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Something failed {e}");
                return null;
            }
        }

        public async Task SessionCompletedAsync(Session session)
        {
            string sessionId = session?.Id ?? string.Empty;
            string auth0UserId = session?.ClientReferenceId ?? string.Empty;

            await _userManagementService.AssignRoleAsync(auth0UserId, "basic");
        }

        public async Task InvoicePaidAsync(Invoice invoice)
        {
            StripeCustomerDto customer = await _stripePaymentService.GetCustomerAsync(invoice.CustomerId);

            await _userManagementService.UpdateAppMetadataAsync(customer.Auth0Id,
                new UserAppMetadataWriteDto()
                {
                    SubscriptionPlan = SubscriptionPlan.Basic,
                    SubscriptionExpires = new DateTimeOffset(invoice.PeriodEnd)
                });
        }

        public async Task InvoiceFailedAsync(Invoice invoice)
        {
            StripeCustomerDto customer = await _stripePaymentService.GetCustomerAsync(invoice.CustomerId);

            await _userManagementService.UpdateAppMetadataAsync(customer.Auth0Id,
                new UserAppMetadataWriteDto()
                {
                    SubscriptionPlan = SubscriptionPlan.Free,
                    SubscriptionExpires = new DateTimeOffset(invoice.PeriodEnd)
                });

            await _userManagementService.DeleteRoleAsync(customer.Auth0Id, "basic");
            await _userManagementService.AssignRoleAsync(customer.Auth0Id, "free");
        }

        public async Task SubscriptionDeletedAsync(Subscription subscriptionDeleted)
        {
            StripeCustomerDto customer = await _stripePaymentService.GetCustomerAsync(subscriptionDeleted.CustomerId);

            await _userManagementService.UpdateAppMetadataAsync(customer.Auth0Id,
                new UserAppMetadataWriteDto()
                {
                    SubscriptionPlan = SubscriptionPlan.Free,
                    SubscriptionExpires = new DateTimeOffset(subscriptionDeleted.EndedAt ?? DateTime.UtcNow),
                });

            await _userManagementService.DeleteRoleAsync(customer.Auth0Id, "basic");
            await _userManagementService.AssignRoleAsync(customer.Auth0Id, "free");
        }

        public async Task PaymentMethodAttachedAsync(PaymentMethod paymentMethod)
        {
            var updatedCustomer =
                new UpdateCustomerDto(paymentMethod.CustomerId, paymentMethod.BillingDetails?.Address?.Country)
                {
                    City = paymentMethod.BillingDetails?.Address?.City,
                    Line1 = paymentMethod.BillingDetails?.Address?.Line1,
                    Line2 = paymentMethod.BillingDetails?.Address?.Line2,
                    State = paymentMethod.BillingDetails?.Address?.State,
                    PostalCode = paymentMethod.BillingDetails?.Address?.PostalCode
                };

            await _stripePaymentService.UpdateCustomerAsync(updatedCustomer);
        }
    }
}