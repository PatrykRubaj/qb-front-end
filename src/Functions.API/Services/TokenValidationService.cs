using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using Functions.Model.DTOs;
using Newtonsoft.Json;
using System.Net.Http;

namespace Services
{
    public class TokenValidationService
    {
        private readonly IHttpClientFactory _clientFactory;

        public TokenValidationService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public bool IsOk(string accessToken)
        {
            return false;
        }
    }

    public class JwtBearerValidation
    {
        private IConfiguration _configuration;
        private ILogger _log;
        private const string scopeType = @"aud";
        private ConfigurationManager<OpenIdConnectConfiguration> _configurationManager;
        private ClaimsPrincipal _claimsPrincipal;

        private string _wellKnownEndpoint = string.Empty;
        private string _audience = string.Empty;
        private string _instance = string.Empty;
        private string _requiredScope = "quantum-budget-api";

        public JwtBearerValidation(IConfiguration configuration, ILogger<JwtBearerValidation> log)
        {
            _configuration = configuration;
            _log = log;

            _audience = _configuration["Auth0_Audience"];
            _instance = _configuration["Auth0_Instance"];
            _wellKnownEndpoint = $"{_instance}/.well-known/openid-configuration";
        }

        public async Task<bool> ShouldAllowAccess(string authorizationHeader, string userId)
        {
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                return false;
            }

            if (!authorizationHeader.Contains("Bearer"))
            {
                return false;
            }

            var accessToken = authorizationHeader.Substring("Bearer ".Length);

            var oidcWellknownEndpoints = await GetOIDCWellknownConfiguration();

            var tokenValidator = new JwtSecurityTokenHandler();

            var validationParameters = GetValidationParameters(oidcWellknownEndpoints);

            try
            {
                SecurityToken securityToken;
                _claimsPrincipal = tokenValidator.ValidateToken(accessToken, validationParameters, out securityToken);

                if (IsScopeValid(_requiredScope))
                {
                    var nameIdentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
                    if (_claimsPrincipal.Claims.FirstOrDefault(x =>
                        x.Type == nameIdentifier)?.Value == userId)
                    {
                        return true;
                    }
                }

                return false;
            }
            catch (Exception ex)
            {
                _log.LogError(ex.ToString());
            }

            return false;
        }

        public async Task<string> GetUserId(string authorizationHeader)
        {
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                return null;
            }

            if (!authorizationHeader.Contains("Bearer"))
            {
                return null;
            }

            var accessToken = authorizationHeader.Substring("Bearer ".Length);

            var oidcWellknownEndpoints = await GetOIDCWellknownConfiguration();

            var tokenValidator = new JwtSecurityTokenHandler();

            var validationParameters = GetValidationParameters(oidcWellknownEndpoints);

            try
            {
                SecurityToken securityToken;
                _claimsPrincipal = tokenValidator.ValidateToken(accessToken, validationParameters, out securityToken);

                if (IsScopeValid(_requiredScope))
                {
                    var nameIdentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
                    string userId = _claimsPrincipal.Claims.FirstOrDefault(x =>
                        x.Type == nameIdentifier)?.Value;

                    return userId;
                }

                return null;
            }
            catch (Exception ex)
            {
                _log.LogError(ex.ToString());
            }

            return null;
        }

        private TokenValidationParameters GetValidationParameters(OpenIdConnectConfiguration oidcWellknownEndpoints)
        {
            return new TokenValidationParameters
            {
                RequireSignedTokens = true,
                ValidAudience = _audience,
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                IssuerSigningKeys = oidcWellknownEndpoints.SigningKeys,
                ValidIssuer = oidcWellknownEndpoints.Issuer
            };
        }

        private async Task<OpenIdConnectConfiguration> GetOIDCWellknownConfiguration()
        {
            _log.LogDebug($"Get OIDC well known endpoints {_wellKnownEndpoint}");
            _configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                _wellKnownEndpoint, new OpenIdConnectConfigurationRetriever());

            return await _configurationManager.GetConfigurationAsync();
        }

        private bool IsScopeValid(string scopeName)
        {
            if (_claimsPrincipal == null)
            {
                _log.LogWarning($"Scope invalid {scopeName}");
                return false;
            }

            var scopeClaim = _claimsPrincipal.HasClaim(x => x.Type == scopeType)
                ? _claimsPrincipal.Claims.First(x => x.Type == scopeType).Value
                : string.Empty;

            if (string.IsNullOrEmpty(scopeClaim))
            {
                _log.LogWarning($"Scope invalid {scopeName}");
                return false;
            }

            if (!scopeClaim.Equals(scopeName, StringComparison.OrdinalIgnoreCase))
            {
                _log.LogWarning($"Scope invalid {scopeName}");
                return false;
            }

            _log.LogInformation($"Scope valid {scopeName}");
            return true;
        }
    }
}