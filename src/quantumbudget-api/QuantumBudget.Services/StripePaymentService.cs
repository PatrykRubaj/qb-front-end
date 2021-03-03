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
    public class StripePaymentService
    {
        private readonly IStripeCustomerRepository _stripeCustomerRepository;
        private readonly IUserManagementService _userManagementService;
        private readonly IPriceNameToIdMapper _priceNameToIdMapper;
        private readonly IStripeCheckoutSessionRepository _stripeCheckoutSessionRepository;
        private readonly IStripeBillingPortalSessionRepository _stripeBillingPortalSessionRepository;

        public StripePaymentService(IStripeCustomerRepository stripeCustomerRepository,
            IStripeCheckoutSessionRepository stripeCheckoutSessionRepository,
            IStripeBillingPortalSessionRepository stripeBillingPortalSessionRepository,
            IUserManagementService userManagementService, IPriceNameToIdMapper priceNameToIdMapper)
        {
            _stripeCustomerRepository = stripeCustomerRepository;
            _userManagementService = userManagementService;
            _priceNameToIdMapper = priceNameToIdMapper;
            _stripeCheckoutSessionRepository = stripeCheckoutSessionRepository;
            _stripeBillingPortalSessionRepository = stripeBillingPortalSessionRepository;
        }

        public async Task<StripeCustomerDto> GetCustomerAsync(string customerId)
        {
            return await _stripeCustomerRepository.GetAsync(customerId);
        }

        public async Task<StripeCustomerDto> CreateCustomerAsync(CreateCustomerDto newCustomer)
        {
            var customer = await _stripeCustomerRepository.CreateAsync(newCustomer);

            //Update app_metadata for the user with Stripe Customer ID
            await _userManagementService.UpdateAppMetadataAsync(customer.Auth0Id,
                new UserAppMetadataWriteDto()
                {
                    StripeCustomerId = customer.Id
                });

            return customer;
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