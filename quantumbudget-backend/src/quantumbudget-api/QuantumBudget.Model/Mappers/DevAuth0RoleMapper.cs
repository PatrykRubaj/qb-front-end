using System;

namespace QuantumBudget.Model.Mappers
{
    public class DevAuth0RoleMapper : IAuth0RoleMapper
    {
        public string MapToId(string roleName)
        {
            switch (roleName.ToLower())
            {
                case "basic":
                    return "rol_iJ8g6auHvb0yzdCK"; //Basic
                default:
                    return "rol_b9hMicSjleXUxq84"; //Free
            }
        }
    }
}