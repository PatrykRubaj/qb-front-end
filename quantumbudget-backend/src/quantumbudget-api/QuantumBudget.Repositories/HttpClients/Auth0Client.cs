using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Model.Options;

namespace QuantumBudget.Repositories.HttpClients
{
    public class Auth0Client
    {
        private readonly Auth0Configuration _authOptions;
        private readonly HttpClient _httpClient;

        public Auth0Client(HttpClient httpClient, IOptions<Auth0Configuration> auth0Options)
        {
            _httpClient = httpClient;
            _authOptions = auth0Options?.Value ?? throw new ArgumentNullException(nameof(auth0Options));
            _httpClient.BaseAddress = new Uri(_authOptions.Instance);
        }

        public async Task<HttpClient> GetAuthenticatedClientAsync()
        {
            if (_httpClient.DefaultRequestHeaders.Authorization == null)
            {
                var managementToken = await GetManagementTokenAsync();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {managementToken.AccessToken}");
            }

            return _httpClient;
        }
        
        public HttpClient GetUsersAuthenticatedClient(string accessToken)
        {
            if (_httpClient.DefaultRequestHeaders.Authorization == null)
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");
            }
            else
            {
                _httpClient.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse($"Bearer {accessToken}");   
            }

            return _httpClient;
        }
        
        private async Task<TokenResponseDto> GetManagementTokenAsync()
        {
            var tokenRequest = new TokenRequestDto()
            {
                ClientId = _authOptions.ClientId,
                ClientSecret = _authOptions.ClientSecret,
                Audience = new Uri(new Uri(_authOptions.Instance), "/api/v2/").ToString(),
                GrantType = "client_credentials"
            };
            var tokenRequestJson = new StringContent(JsonConvert.SerializeObject(tokenRequest), Encoding.UTF8,
                "application/json");

            using var httpResponse =
                await _httpClient.PostAsync($"oauth/token", tokenRequestJson);

            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var authToken = JsonConvert.DeserializeObject<TokenResponseDto>(responseAsString);

            return authToken;
        }
    }
}