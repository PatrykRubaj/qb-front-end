using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Model.Options;

namespace QuantumBudget.Services
{
    public class GoogleAuthService
    {
        private readonly GoogleApiCredentials _configuration;
        private readonly IHttpClientFactory _clientFactory;

        public GoogleAuthService(IOptions<GoogleApiCredentials> configuration, IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
            _configuration = configuration?.Value ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<Auth0UserDto> GetNewAccessTokenAsync(Auth0UserDto user)
        {
            var client = _clientFactory.CreateClient();
            var googleIdentity = user.Identities?.FirstOrDefault(x => x.Provider == "google-oauth2");

            if (googleIdentity != null)
            {
                var jsonContent = JsonConvert.SerializeObject(new
                {
                    client_id = _configuration.ClientId, 
                    client_secret = _configuration.ClientSecret,
                    refresh_token = googleIdentity?.RefreshToken,
                    grant_type = "refresh_token"
                });
                var stringContent = new StringContent(jsonContent,
                    Encoding.UTF8, "application/json");

                client.BaseAddress = new Uri("https://oauth2.googleapis.com/token");

                var httpResponse = await client.PostAsync("/token", stringContent);
            
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseAsString = await httpResponse.Content.ReadAsStringAsync();
                    var authToken = JsonConvert.DeserializeObject<TokenResponseDto>(responseAsString);

                    googleIdentity.AccessToken = authToken.AccessToken;
                    googleIdentity.ExpiresIn = authToken.ExpiresIn;

                    return user;
                }
            }

            return null;
        }
    }
}