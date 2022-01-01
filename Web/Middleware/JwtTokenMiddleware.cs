using Core.Identity.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Threading.Tasks;

namespace Web.Middleware
{
    public class JwtTokenMiddleware : IMiddleware
    {
        private readonly ITokenManager TokenManager;
        private readonly IHttpContextAccessor Accessor;
        private readonly StringValues authHeader;
        private readonly string ip;

        public JwtTokenMiddleware(ITokenManager tokenManager, IHttpContextAccessor accessor)
        {
            TokenManager = tokenManager;
            Accessor = accessor;
            authHeader = Accessor.HttpContext.Request.Headers["authorization"];
            ip = Accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
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
