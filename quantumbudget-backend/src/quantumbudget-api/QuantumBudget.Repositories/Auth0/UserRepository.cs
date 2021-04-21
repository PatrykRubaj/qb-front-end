using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Repositories.HttpClients;

namespace QuantumBudget.Repositories.Auth0
{
    public class UserRepository : IUserRepository
    {
        private readonly Auth0Client _auth0Client;

        public UserRepository(Auth0Client auth0Client)
        {
            _auth0Client = auth0Client;
        }

        public async Task<Auth0UserDto> GetAsync(string userId)
        {
            var httpClient = await _auth0Client.GetAuthenticatedClientAsync();

            using var httpResponse = await httpClient.GetAsync($"api/v2/users/{userId}");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();

            var auth0User = JsonConvert.DeserializeObject<Auth0UserDto>(responseAsString);
            return auth0User;
        }
        
        public async Task UpdateAppMetadata(string userId, UserAppMetadataWriteDto userAppMetadataDto)
        {
            var jsonContent = JsonConvert.SerializeObject(new {app_metadata = userAppMetadataDto},
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                });
            
            var stringContent = new StringContent(jsonContent,
                Encoding.UTF8, "application/json");


            var httpClient = await _auth0Client.GetAuthenticatedClientAsync();

            using var httpResponse = await httpClient.PatchAsync($"api/v2/users/{userId}", stringContent);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception(httpResponse.ReasonPhrase);
            }
        }
    }
}