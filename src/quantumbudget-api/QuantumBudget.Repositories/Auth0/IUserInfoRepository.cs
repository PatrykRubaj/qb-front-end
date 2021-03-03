using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Auth0;

namespace QuantumBudget.Repositories.Auth0
{
    public interface IUserInfoRepository
    {
        Task<UserInfoDto> GetUserInfo(string userAccessToken);
    }
}