using Core.Identity.Managers;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Web.Middleware
{
    public class JwtTokenMiddleware : IMiddleware
    {
        private readonly ITokenManager TokenManager;

        public JwtTokenMiddleware(ITokenManager tokenManager)
        {
            TokenManager = tokenManager;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var authHeader = context.Request.Headers["authorization"];
            var ip = context.Connection.RemoteIpAddress.MapToIPv4().ToString();
            if (TokenManager.CurrentIsDisable(authHeader).Result)
            {
                if (context.Response.ContentType == null)
                {
                    context.Response.ContentType = "application/json";

                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    context.Response.StatusCode = 200;
                    await context.Response.WriteAsync("{\"code\" : \"401\"}");
                }
                return;
            }
            else
            {
                string token = TokenManager.GetCurrent(authHeader).Result;
                if (!string.IsNullOrEmpty(token))
                {
                    if (TokenManager.SameIP(authHeader, ip).Result)
                    {
                        await next(context);
                        return;
                    }
                    if (context.Response.ContentType == null)
                    {
                        context.Response.ContentType = "application/json";

                        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                        context.Response.StatusCode = 200;
                        await context.Response.WriteAsync("{\"code\" : \"401\"}");
                    }
                    return;
                }
            }
            await next(context);
            return;
        }
    }
}
