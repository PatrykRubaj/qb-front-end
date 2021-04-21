using System.Threading.Tasks;
using Newtonsoft.Json;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Repositories.HttpClients;

namespace QuantumBudget.Repositories.Auth0
{
    public class UserInfoRepository : IUserInfoRepository
    {
        private readonly Auth0Client _auth0Client;

        public UserInfoRepository(Auth0Client auth0Client)
        {
            _auth0Client = auth0Client;
        }
        
        public async Task<UserInfoDto> GetUserInfo(string userAccessToken)
        {
            var client = _auth0Client.GetUsersAuthenticatedClient(userAccessToken);
            client = _auth0Client.GetUsersAuthenticatedClient(userAccessToken);
            
            using var httpResponse = await client.GetAsync($"userinfo");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var userInfo = JsonConvert.DeserializeObject<UserInfoDto>(responseAsString);

            return userInfo;
        }
    }
}