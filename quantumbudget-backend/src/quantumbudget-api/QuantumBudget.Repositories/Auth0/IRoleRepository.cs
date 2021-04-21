using System.Threading.Tasks;

namespace QuantumBudget.Repositories.Auth0
{
    public interface IRoleRepository
    {
        Task AssignRole(string userId, string roleId);
        Task AssignRoles(string userId, string[] roleIds);
        Task DeleteRole(string userId, string roleId);
    }
}