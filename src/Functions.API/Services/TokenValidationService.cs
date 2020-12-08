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
        
        public async Task<UserInfo> GetUserInfo(string userAccessToken)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"{userAccessToken}");
            using var httpResponse = await client.GetAsync($"https://quantumbudget.eu.auth0.com/userinfo");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var userInfo = JsonConvert.DeserializeObject<UserInfo>(responseAsString);

            return userInfo;
        }
    }
    
    public class AzureADJwtBearerValidation
    {
        private IConfiguration _configuration;
        private ILogger _log;
        private const string scopeType = @"aud";
        private ConfigurationManager<OpenIdConnectConfiguration> _configurationManager;
        private ClaimsPrincipal _claimsPrincipal;
 
        private string _wellKnownEndpoint = string.Empty;
        private string _tenantId = string.Empty;
        private string _audience = string.Empty;
        private string _instance = string.Empty;
        private string _requiredScope = "quantum-budget-api";
 
        public AzureADJwtBearerValidation(IConfiguration configuration, ILogger<AzureADJwtBearerValidation> log)
        {
            _configuration = configuration;
            _log = log;
 
            _tenantId = _configuration["Auth0_TenantId"];
            _audience = _configuration["Auth0_Audience"];
            _instance = _configuration["Auth0_Instance"];
            _wellKnownEndpoint = $"{_instance}/.well-known/openid-configuration";
        }
 
        public async Task<ClaimsPrincipal> ValidateTokenAsync(string authorizationHeader)
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
 
            var validationParameters = new TokenValidationParameters
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
 
            try
            {
                SecurityToken securityToken;
                _claimsPrincipal = tokenValidator.ValidateToken(accessToken, validationParameters, out securityToken);
 
                if (IsScopeValid(_requiredScope))
                {
                    return _claimsPrincipal;
                }
 
                return null;
            }
            catch (Exception ex)
            {
                _log.LogError(ex.ToString());
            }
            return null;
        }
 
        public string GetPreferredUserName()
        {
            string preferredUsername = string.Empty;
            var preferred_username = _claimsPrincipal.Claims.FirstOrDefault(t => t.Type == "preferred_username");
            if (preferred_username != null)
            {
                preferredUsername = preferred_username.Value;
            }
 
            return preferredUsername;
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

            foreach (var claim in _claimsPrincipal.Claims)
            {
                var dupa = $"{claim.Type} = {claim.Value} - {claim.ValueType}";
                _log.LogInformation(dupa);
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
 
            _log.LogDebug($"Scope valid {scopeName}");
            return true;
        }
    }
}