using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Functions.Model.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Services
{
    public class UserManagementService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserManagementService> _log;
        
        private readonly string _tenant;
        private readonly string _clientId;
        private readonly string _clientSecret;


        public UserManagementService(IHttpClientFactory clientFactory, IConfiguration configuration, ILogger<UserManagementService> log)
        {
            _clientFactory = clientFactory;
            _configuration = configuration;
            _log = log;
            _tenant = configuration.GetValue<string>("Auth0_Instance");
            _clientId = configuration.GetValue<string>("Auth0_ClientId");
            _clientSecret = configuration.GetValue<string>("Auth0_ClientSecret");
        }

        public async Task<UserInfo> GetUserInfo(string userAccessToken)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"{userAccessToken}");
            using var httpResponse = await client.GetAsync($"{_tenant}/userinfo");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var userInfo = JsonConvert.DeserializeObject<UserInfo>(responseAsString);

            return userInfo;
        }
        
        public async Task<Auth0User> GetAuth0User(string userId)
        {
            var managementToken = await GetManagementToken();
            
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {managementToken.AccessToken}");
            
            using var httpResponse = await client.GetAsync($"{_tenant}/api/v2/users/{userId}");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            
            var auth0User = JsonConvert.DeserializeObject<Auth0User>(responseAsString);
            return auth0User;
        }
        
        private async Task<TokenResponse> GetManagementToken()
        {
            var tokenRequest = new TokenRequest()
            {
                ClientId = _clientId,
                ClientSecret = _clientSecret,
                Audience = $"{_tenant}/api/v2/",
                GrantType = "client_credentials"
            };
            var tokenRequestJson = new StringContent(JsonConvert.SerializeObject(tokenRequest), Encoding.UTF8,
                "application/json");

            var client = _clientFactory.CreateClient();
            using var httpResponse =
                await client.PostAsync($"{_tenant}/oauth/token", tokenRequestJson);

            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var authToken = JsonConvert.DeserializeObject<TokenResponse>(responseAsString);

            return authToken;
        }
    }
}