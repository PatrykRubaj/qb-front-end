using System;
using Microsoft.AspNetCore.Authorization;

namespace QuantumBudget.API.Policies
{
    public class HasPermissionRequirement : IAuthorizationRequirement
    {
        public string Issuer { get; }
        public string Permission { get; }

        public HasPermissionRequirement(string permission, string issuer)
        {
            Console.WriteLine($"Issuer: {issuer}");
            Permission = permission ?? throw new ArgumentNullException(nameof(permission));
            Issuer = issuer ?? throw new ArgumentNullException(nameof(issuer));
        }
    }
}