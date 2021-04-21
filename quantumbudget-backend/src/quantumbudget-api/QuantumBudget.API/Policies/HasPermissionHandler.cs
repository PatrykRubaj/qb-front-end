using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace QuantumBudget.API.Policies
{
    public class HasPermissionHandler: AuthorizationHandler<HasPermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasPermissionRequirement requirement)
        {
            // If user does not have the scope claim, get out of here
            var foundClaim = context.User.HasClaim(c => c.Type == "permissions" && c.Issuer == requirement.Issuer && c.Value == requirement.Permission);
            Console.WriteLine($"Found claim: {foundClaim}" );
            if (!foundClaim)
                return Task.CompletedTask;

            // Split the scopes string into an array
            var permission = context.User.FindFirst(c => c.Type == "permissions" && c.Issuer == requirement.Issuer && c.Value == requirement.Permission).Value;

            Console.WriteLine($"permissions: {permission}" );
            // Succeed if the scope array contains the required scope
            if (!string.IsNullOrEmpty(permission))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}