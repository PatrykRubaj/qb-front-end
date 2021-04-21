using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Auth0;

namespace QuantumBudget.Services.Tests.Services
{
    public class UserManagementServiceMock : IUserManagementService
    {
        public List<Auth0UserDto> Users { get; }

        public UserManagementServiceMock()
        {
            Users = new List<Auth0UserDto>()
            {
                new()
                {
                    Email = "patryk4@test.com",
                    Name = "Patryk Tester",
                    AppMetadata = new Auth0AppMetadata(),
                    GivenName = "Patryk",
                    UserId = "google-oauth2|00004",
                    Identities = new List<Auth0IdentitiesDto>()
                    {
                        new()
                        {
                            Provider = "google-oauth2",
                            AccessToken = "token1",
                            UserId = "google-oauth2|00004",
                        }
                    }
                },
            };
        }

        public async Task<UserInfoDto> GetUserInfoAsync(string userAccessToken)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Auth0UserDto> GetAuth0UserAsync(string userId)
        {
            return Users.FirstOrDefault(x => x.UserId == userId);
        }

        public async Task UpdateAppMetadataAsync(string userId, UserAppMetadataWriteDto userAppMetadataDto)
        {
            var modifiedUser = Users.FirstOrDefault(x => x.UserId == userId);

            if (modifiedUser != null)
            {
                modifiedUser.AppMetadata.StripeCustomerId = userAppMetadataDto.StripeCustomerId;
            }
        }

        public async Task AssignRoleAsync(string userId, string roleName)
        {
            throw new System.NotImplementedException();
        }

        public async Task DeleteRoleAsync(string userId, string roleName)
        {
            throw new System.NotImplementedException();
        }
    }
}