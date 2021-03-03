using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using QuantumBudget.Repositories.HttpClients;

namespace QuantumBudget.Repositories.Auth0
{
    public class RoleRepository : IRoleRepository
    {
        private readonly Auth0Client _auth0Client;

        public RoleRepository(Auth0Client auth0Client)
        {
            _auth0Client = auth0Client;
        }

        public async Task AssignRole(string userId, string roleId)
        {
            await AssignRoles(userId, new[] {roleId});
        }

        public async Task AssignRoles(string userId, string[] roleIds)
        {
            var stringContent = new StringContent(
                JsonConvert.SerializeObject(new {roles = roleIds}),
                Encoding.UTF8, "application/json");

            var httpClient = await _auth0Client.GetAuthenticatedClientAsync();

            using var httpResponse = await httpClient.PostAsync($"api/v2/users/{userId}/roles", stringContent);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception($"Error: {httpResponse.StatusCode}: {httpResponse.Content}");
            }
        }

        public async Task DeleteRole(string userId, string roleId)
        {
            var stringContent = new StringContent(JsonConvert.SerializeObject(new {roles = new string[] {roleId}}),
                Encoding.UTF8, "application/json");

            var httpClient = await _auth0Client.GetAuthenticatedClientAsync();

            var requestMessage = new HttpRequestMessage()
            {
                Method = HttpMethod.Delete,
                Content = stringContent,
                RequestUri = new Uri($"api/v2/users/{userId}/roles"),
            };

            using var httpResponse = await httpClient.SendAsync(requestMessage);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception($"Error: {httpResponse.StatusCode}: {httpResponse.Content}");
            }
        }
    }
}