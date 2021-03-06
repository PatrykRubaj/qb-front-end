﻿using System;
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
            var customer = await _stripeCustomerRepository.GetAsync(customerId);

            var customersSubscription = customer.Subscriptions?.FirstOrDefault();
            StripeSubscriptionDto stripeSubscription = null;

            if (customersSubscription != null)
            {
                stripeSubscription = new StripeSubscriptionDto()
                {
                    Id = customersSubscription.Id,
                    CustomerId = customersSubscription.CustomerId,
                    Status = customersSubscription.Status,
                };
            }

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

        public async Task<UpdateCustomerDto> UpdateCustomerAsync(UpdateCustomerDto updatedCustomer)
        {
            var updateCustomerOptions = new CustomerUpdateOptions()
            {
                Address = new AddressOptions()
                {
                    City = updatedCustomer.City,
                    Country = updatedCustomer.Country,
                    Line1 = updatedCustomer.Line1,
                    Line2 = updatedCustomer.Line2,
                    State = updatedCustomer.State,
                    PostalCode = updatedCustomer.PostalCode,
                }
            };

            var customer =
                await _stripeCustomerRepository.UpdateAsync(updatedCustomer.CustomerId, updateCustomerOptions);

            var customerToReturn = new UpdateCustomerDto(customer.Id, customer.Address.Country)
            {
                City = customer?.Address?.City,
                PostalCode = customer?.Address?.PostalCode,
                Line1 = customer?.Address?.Line1,
                Line2 = customer?.Address?.Line2,
                State = customer?.Address?.State,
            };

            return customerToReturn;
        }
    }
}