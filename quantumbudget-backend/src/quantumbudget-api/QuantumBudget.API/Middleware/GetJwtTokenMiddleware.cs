using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using QuantumBudget.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QuantumBudget.API.Middleware
{
    public class GetJwtTokenMiddleware
    {
        private readonly RequestDelegate _next;

        public GetJwtTokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, JwtToken jwtToken)
        {
            jwtToken.UserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            context.Request.Headers.TryGetValue("Authorization", out var accessToken);
            
            jwtToken.AccessToken = accessToken;
                
            await _next(context);
        }
    }

    public static class GetJwtTokenMiddlewareExtensions
    {
        public static IApplicationBuilder UseGetJwtToken(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GetJwtTokenMiddleware>();
        }
    }
}
