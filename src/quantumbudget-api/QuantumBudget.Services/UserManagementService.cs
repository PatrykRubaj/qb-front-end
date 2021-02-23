using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using QuantumBudget.Model.DTOs.Auth0;

namespace QuantumBudget.Services
{
    public interface IUserManagementService
    {
        Task<UserInfoDto> GetUserInfo(string userAccessToken);
        Task<Auth0UserDto> GetAuth0User(string userId);
        Task UpdateAppMetadata(string userId, object userAppMetadataDto);
        Task AssignRole(string userId, Auth0Role role);
        Task DeleteRole(string userId, Auth0Role role);
    }

    public class UserManagementService : IUserManagementService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserManagementService> _log;

        private readonly string _tenant;
        private readonly string _clientId;
        private readonly string _clientSecret;


        public UserManagementService(IHttpClientFactory clientFactory, IConfiguration configuration,
            ILogger<UserManagementService> log)
        {
            _clientFactory = clientFactory;
            _configuration = configuration;
            _log = log;
            _tenant = configuration.GetValue<string>("Auth0_Instance");
            _clientId = configuration.GetValue<string>("Auth0_ClientId");
            _clientSecret = configuration.GetValue<string>("Auth0_ClientSecret");
        }

        public async Task<UserInfoDto> GetUserInfo(string userAccessToken)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"{userAccessToken}");
            using var httpResponse = await client.GetAsync($"{_tenant}userinfo");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var userInfo = JsonConvert.DeserializeObject<UserInfoDto>(responseAsString);

            return userInfo;
        }

        public async Task<Auth0UserDto> GetAuth0User(string userId)
        {
            var managementToken = await GetManagementToken();

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {managementToken.AccessToken}");

            using var httpResponse = await client.GetAsync($"{_tenant}api/v2/users/{userId}");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            Console.WriteLine(responseAsString);
            var auth0User = JsonConvert.DeserializeObject<Auth0UserDto>(responseAsString);
            return auth0User;
        }

        public async Task UpdateAppMetadata(string userId, object userAppMetadataDto)
        {
            var jsonContent = JsonConvert.SerializeObject(new {app_metadata = userAppMetadataDto});
            var stringContent = new StringContent(jsonContent,
                Encoding.UTF8, "application/json");
            var managementToken = await GetManagementToken();

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {managementToken.AccessToken}");

            using var httpResponse = await client.PatchAsync($"{_tenant}api/v2/users/{userId}", stringContent);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception(httpResponse.ReasonPhrase);
            }
        }

        public async Task AssignRole(string userId, Auth0Role role)
        {
            var stringContent = new StringContent(JsonConvert.SerializeObject(new {roles = new string[] {role.RoleId}}),
                Encoding.UTF8, "application/json");
            var managementToken = await GetManagementToken();

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {managementToken.AccessToken}");

            using var httpResponse = await client.PostAsync($"{_tenant}api/v2/users/{userId}/roles", stringContent);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception($"Error: {httpResponse.StatusCode}: {httpResponse.Content}");
            }
        }

        public async Task DeleteRole(string userId, Auth0Role role)
        {
            var stringContent = new StringContent(JsonConvert.SerializeObject(new {roles = new string[] {role.RoleId}}),
                Encoding.UTF8, "application/json");
            var managementToken = await GetManagementToken();

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {managementToken.AccessToken}");

            var requestMessage = new HttpRequestMessage()
            {
                Method = HttpMethod.Delete,
                Content = stringContent,
                RequestUri = new Uri($"{_tenant}api/v2/users/{userId}/roles")
            };
            using var httpResponse = await client.SendAsync(requestMessage);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception($"Error: {httpResponse.StatusCode}: {httpResponse.Content}");
            }
        }
        
        private async Task<TokenResponseDto> GetManagementToken()
        {
            var tokenRequest = new TokenRequestDto()
            {
                ClientId = _clientId,
                ClientSecret = _clientSecret,
                Audience = $"{_tenant}api/v2/",
                GrantType = "client_credentials"
            };
            var tokenRequestJson = new StringContent(JsonConvert.SerializeObject(tokenRequest), Encoding.UTF8,
                "application/json");

            var client = _clientFactory.CreateClient();
            using var httpResponse =
                await client.PostAsync($"{_tenant}oauth/token", tokenRequestJson);

            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var authToken = JsonConvert.DeserializeObject<TokenResponseDto>(responseAsString);

            return authToken;
        }
    }
}