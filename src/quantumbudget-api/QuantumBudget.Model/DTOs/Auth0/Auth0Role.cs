using System;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class Auth0Role
    {
        private readonly string _roleName;

        public Auth0Role(string roleName)
        {
            _roleName = String.IsNullOrEmpty(roleName) == false ? roleName : throw new ArgumentException(nameof(roleName));
        }

        private string MapNameToId()
        {
            switch (_roleName.ToLower())
            {
                case "basic":
                    return "rol_iJ8g6auHvb0yzdCK"; //Basic
                default:
                    return "rol_b9hMicSjleXUxq84"; //Free
            }
        }

        public string RoleId => MapNameToId();
    }
}