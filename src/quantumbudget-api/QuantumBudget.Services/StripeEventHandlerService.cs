using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Auth0;
using Stripe;
using Stripe.Checkout;

namespace QuantumBudget.Services
{
    public class StripeEventHandlerService
    {
        private readonly IUserManagementService _userManagementService;
        private readonly StripePaymentService _paymentService;

        public StripeEventHandlerService(IUserManagementService userManagementService, StripePaymentService paymentService)
        {
            _userManagementService = userManagementService;
            _paymentService = paymentService;
        }
        
        public async Task SessionCompletedAsync(Session session)
        {
            string sessionId = session?.Id ?? string.Empty;
            string auth0UserId = session?.ClientReferenceId ?? string.Empty;
            
            await _userManagementService.AssignRole(auth0UserId, new Auth0Role("Basic"));
        }

        public async Task InvoicePaid(Invoice invoice)
        {
            Customer customer = await _paymentService.GetCustomer(invoice.CustomerId);

            string auth0UserId = customer.Metadata.GetValueOrDefault("auth0UserId") ?? string.Empty;
            await _userManagementService.UpdateAppMetadata(auth0UserId, new UserAppMetadataWriteSubscriptionInfoDto()
            {
                SubscriptionPlan = SubscriptionPlan.Basic,
                SubscriptionExpires = new DateTimeOffset(invoice.PeriodEnd)
            });
        }

        public async Task InvoiceFailed(Invoice invoice)
        {
            Customer customer = await _paymentService.GetCustomer(invoice.CustomerId);

            string auth0UserId = customer.Metadata.GetValueOrDefault("auth0UserId") ?? throw new ArgumentNullException(nameof(auth0UserId));
            await _userManagementService.UpdateAppMetadata(auth0UserId, new UserAppMetadataWriteSubscriptionInfoDto()
            {
                SubscriptionPlan = SubscriptionPlan.Free,
                SubscriptionExpires = new DateTimeOffset(invoice.PeriodEnd)
            });
            
            await _userManagementService.DeleteRole(auth0UserId, new Auth0Role("Basic"));
            await _userManagementService.AssignRole(auth0UserId, new Auth0Role("Free"));
        }

        public async Task SubscriptionDeleted(Subscription subscriptionDeleted)
        {
            Customer customer = await _paymentService.GetCustomer(subscriptionDeleted.CustomerId);

            string auth0UserId = customer.Metadata?.GetValueOrDefault("auth0UserId") ?? throw new ArgumentNullException(nameof(auth0UserId));
            await _userManagementService.UpdateAppMetadata(auth0UserId, new UserAppMetadataWriteSubscriptionInfoDto()
            {
                SubscriptionPlan = SubscriptionPlan.Free,
                SubscriptionExpires = new DateTimeOffset(subscriptionDeleted.EndedAt ?? DateTime.UtcNow),
            });
            
            await _userManagementService.DeleteRole(auth0UserId, new Auth0Role("Basic"));
            await _userManagementService.AssignRole(auth0UserId, new Auth0Role("Free"));
        }
    }
}