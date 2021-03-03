using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Model.Mappers;
using QuantumBudget.Repositories.Auth0;
using QuantumBudget.Repositories.HttpClients;

namespace QuantumBudget.Services
{
    public interface IUserManagementService
    {
        Task<UserInfoDto> GetUserInfoAsync(string userAccessToken);
        Task<Auth0UserDto> GetAuth0UserAsync(string userId);
        Task UpdateAppMetadataAsync(string userId, UserAppMetadataWriteDto userAppMetadataDto);
        Task AssignRoleAsync(string userId, string roleName);
        Task DeleteRoleAsync(string userId, string roleName);
    }

    public class UserManagementService : IUserManagementService
    {
        private readonly IAuth0RoleMapper _auth0RoleMapper;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IUserInfoRepository _userInfoRepository;

        public UserManagementService(IAuth0RoleMapper auth0RoleMapper,
            IUserRepository userRepository, IRoleRepository roleRepository, IUserInfoRepository userInfoRepository)
        {
            _auth0RoleMapper = auth0RoleMapper;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _userInfoRepository = userInfoRepository;
        }

        public async Task<UserInfoDto> GetUserInfoAsync(string userAccessToken)
        {
            return await _userInfoRepository.GetUserInfo(userAccessToken);
        }

        public async Task<Auth0UserDto> GetAuth0UserAsync(string userId)
        {
            return await _userRepository.GetAsync(userId);
        }

        public async Task UpdateAppMetadataAsync(string userId, UserAppMetadataWriteDto userAppMetadataDto)
        {
            await _userRepository.UpdateAppMetadata(userId, userAppMetadataDto);
        }

        public async Task AssignRoleAsync(string userId, string roleName)
        {
            await _roleRepository.AssignRole(userId, _auth0RoleMapper.MapToId(roleName));
        }

        public async Task DeleteRoleAsync(string userId, string roleName)
        {
            await _roleRepository.DeleteRole(userId, _auth0RoleMapper.MapToId(roleName));
        }
    }
}