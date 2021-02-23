using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Services;

namespace QuantumBudget.API.Tests.Services
{
    public class UserManagementServiceMock : IUserManagementService
    {
        public async Task<UserInfoDto> GetUserInfo(string userAccessToken)
        {
            return new UserInfoDto
            {
                Email = "patryk@quantumbudget.com",
                GivenName = "Patryk Patryk",
                UserId = "qb|patryk1"
            };
        }

        public async Task<Auth0UserDto> GetAuth0User(string userId)
        {
            return new Auth0UserDto
            {
                Email = "patryk@quantumbudget.com",
                GivenName = "Patryk Patryk",
                UserId = "qb|patryk1",
                Identities = new List<Auth0IdentitiesDto>
                {
                    new Auth0IdentitiesDto
                    {
                        Provider = "qb",
                        UserId = "qb|patryk1",
                        ExpiresIn = DateTimeOffset.Now.Millisecond,
                        AccessToken = "accessToken-patryk1",
                        RefreshToken = null
                    }
                }
            };
        }

        public async Task UpdateAppMetadata(string userId, object userAppMetadataDto)
        {
            throw new NotImplementedException();
        }

        public async Task AssignRole(string userId, Auth0Role role)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteRole(string userId, Auth0Role role)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAppMetadata(string userId, UserAppMetadataWriteSubscriptionInfoDto userAppMetadataWriteSubscriptionInfoDto)
        {
            UpdatedAppMetadataWriteSubscriptionInfo = userAppMetadataWriteSubscriptionInfoDto;
        }
        
        public UserAppMetadataWriteSubscriptionInfoDto UpdatedAppMetadataWriteSubscriptionInfo { get; private set; }
    }
}