using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Model.DTOs.Stripe;
using QuantumBudget.Model.Mappers;
using QuantumBudget.Model.Options;
using QuantumBudget.Repositories.Stripe;
using Stripe;
using Stripe.Checkout;

namespace QuantumBudget.Services
{
    public class StripePaymentService : IStripePaymentService
    {
        private readonly IStripeCustomerRepository _stripeCustomerRepository;
        private readonly IUserManagementService _userManagementService;
        private readonly IPriceNameToIdMapper _priceNameToIdMapper;
        private readonly CustomerService _customerService;
        private readonly IStripeCheckoutSessionRepository _stripeCheckoutSessionRepository;
        private readonly IStripeBillingPortalSessionRepository _stripeBillingPortalSessionRepository;

        public StripePaymentService(IStripeCustomerRepository stripeCustomerRepository,
            IStripeCheckoutSessionRepository stripeCheckoutSessionRepository,
            IStripeBillingPortalSessionRepository stripeBillingPortalSessionRepository,
            IUserManagementService userManagementService, IPriceNameToIdMapper priceNameToIdMapper,
            CustomerService customerService)
        {
            _stripeCustomerRepository = stripeCustomerRepository;
            _userManagementService = userManagementService;
            _priceNameToIdMapper = priceNameToIdMapper;
            _customerService = customerService;
            _stripeCheckoutSessionRepository = stripeCheckoutSessionRepository;
            _stripeBillingPortalSessionRepository = stripeBillingPortalSessionRepository;
        }

        public async Task<StripeCustomerDto> GetCustomerAsync(string customerId)
        {
            Customer customer = await _customerService.GetAsync(customerId, new CustomerGetOptions()
            {
                Expand = new List<string>()
                {
                    "subscriptions"
                }
            });

            var customersSubscription = customer.Subscriptions?.FirstOrDefault();
            StripeSubscriptionDto stripeSubscription = new StripeSubscriptionDto()
            {
                Id = customersSubscription?.Id,
                CustomerId = customersSubscription?.CustomerId,
                Status = customersSubscription?.Status,
            };

            var stripeCustomer = new StripeCustomerDto()
            {
                Id = customer.Id,
                Auth0Id = customer.Metadata?.GetValueOrDefault("auth0UserId"),
                Subscription = stripeSubscription,
            };

            return stripeCustomer;
        }

        public async Task<StripeCustomerDto> CreateCustomerAsync(CreateCustomerDto newCustomer)
        {
            var customerCreateOptions = new CustomerCreateOptions
            {
                Email = newCustomer.Email,
                Name = newCustomer.Name,
                Metadata = newCustomer.Metadata,
            };

            var customer = await _stripeCustomerRepository.CreateAsync(customerCreateOptions);
            var createdCustomer = new StripeCustomerDto()
            {
                Id = customer.Id,
                Auth0Id = customer.Metadata?.GetValueOrDefault("auth0UserId"),
            };

            //Update app_metadata for the user with Stripe Customer ID
            await _userManagementService.UpdateAppMetadataAsync(createdCustomer.Auth0Id,
                new UserAppMetadataWriteDto()
                {
                    StripeCustomerId = createdCustomer.Id
                });

            return createdCustomer;
        }

        public async Task<CreateCheckoutSessionResponseDto> CreateCheckoutSessionAsync(string stripeCustomerId,
            string auth0UserId, string priceTier)
        {
            var checkoutSessionResponseDto = await _stripeCheckoutSessionRepository.CreateAsync(stripeCustomerId,
                auth0UserId, _priceNameToIdMapper.Map(priceTier),
                _priceNameToIdMapper.TaxId);

            return checkoutSessionResponseDto;
        }

        public async Task<CustomerPortalSessionResponseDto> CreateBillingPortalSessionAsync(string userId)
        {
            var user = await _userManagementService.GetAuth0UserAsync(userId);

            if (string.IsNullOrEmpty(user?.AppMetadata?.StripeCustomerId)) return null;

            var portalSession =
                await _stripeBillingPortalSessionRepository.CreateAsync(user.AppMetadata.StripeCustomerId);
            return portalSession;
        }
    }
}