using System;

namespace QuantumBudget.Model.Mappers
{
    public class ProdAuth0RoleMapper : IAuth0RoleMapper
    {
        public string MapToId(string roleName)
        {
            switch (roleName.ToLower())
            {
                case "basic":
                    return "rol_LmIx9P4FwGZCeAdv"; //Basic
                default:
                    return "rol_ekBSU8O3QGC2oyM0"; //Free
            }
        }
    }
}