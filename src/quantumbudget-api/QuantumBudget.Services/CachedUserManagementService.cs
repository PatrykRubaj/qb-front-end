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
        
        public async Task<UserInfoDto> GetUserInfoAsync(string userAccessToken)
        {
            return await _userManagementService.GetUserInfoAsync(userAccessToken);
        }

        public async Task<Auth0UserDto> GetAuth0UserAsync(string userId)
        {
            if (!_memoryCache.TryGetValue(userId, out Auth0UserDto user))
            {
                user = await _userManagementService.GetAuth0UserAsync(userId);
                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(3));

                // Save data in cache.
                _memoryCache.Set(userId, user, cacheEntryOptions);
            }

            return user;
        }

        public async Task UpdateAppMetadataAsync(string userId, UserAppMetadataWriteDto userAppMetadataDto)
        {
            await _userManagementService.UpdateAppMetadataAsync(userId, userAppMetadataDto);
        }

        public async Task AssignRoleAsync(string userId, string roleName)
        {
            await _userManagementService.AssignRoleAsync(userId, roleName);
        }

        public async Task DeleteRoleAsync(string userId, string roleName)
        {
            await _userManagementService.DeleteRoleAsync(userId, roleName);
        }
    }
}