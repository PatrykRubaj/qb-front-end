using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using QuantumBudget.Model.DTOs.Auth0;

namespace QuantumBudget.Services
{
    public class CachedUserManagementService : IUserManagementService
    {
        private readonly IUserManagementService _userManagementService;
        private readonly IMemoryCache _memoryCache;

        public CachedUserManagementService(IUserManagementService userManagementService, IMemoryCache memoryCache)
        {
            _userManagementService = userManagementService;
            _memoryCache = memoryCache;
        }
        
        public async Task<UserInfoDto> GetUserInfo(string userAccessToken)
        {
            return await _userManagementService.GetUserInfo(userAccessToken);
        }

        public async Task<Auth0UserDto> GetAuth0User(string userId)
        {
            if (!_memoryCache.TryGetValue(userId, out Auth0UserDto user))
            {
                user = await _userManagementService.GetAuth0User(userId);
                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(3));

                // Save data in cache.
                _memoryCache.Set(userId, user, cacheEntryOptions);
            }

            return user;
        }

        public async Task UpdateAppMetadata(string userId, object userAppMetadataDto)
        {
            await _userManagementService.UpdateAppMetadata(userId, userAppMetadataDto);
        }

        public async Task AssignRole(string userId, Auth0Role role)
        {
            await _userManagementService.AssignRole(userId, role);
        }

        public async Task DeleteRole(string userId, Auth0Role role)
        {
            await _userManagementService.DeleteRole(userId, role);
        }
    }
}