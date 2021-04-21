using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Auth0;

namespace QuantumBudget.Repositories.Auth0
{
    public interface IUserRepository
    {
        Task<Auth0UserDto> GetAsync(string userId);
        Task UpdateAppMetadata(string userId, UserAppMetadataWriteDto userAppMetadataDto);
    }
}