using Core.Base.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Helper
{
    public static class Utils
    {
        public static IActionResult BuildResult<T>(this ManagerResult<T> result)
        {
            if (result.Success)
            {
                return new OkObjectResult(result.Result);
            }
            return new BadRequestObjectResult(result.Errors);
        }

        public static object CreateViewModel<T, R>(this ManagerResult<T> result, Func<T, R> func)
        {
            return new
            {
                result.Code,
                result.Message,
                result.Success,
                result.Errors,
                Result = func(result.Result)
            };
        }

        public static string CreateMessageBaseOnEnvironment(int code)
        {
            return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ? $"SMS Sent.{code}" : "SMS Sent.";
        }

        public static string GetUserId(this ClaimsPrincipal user)
        {
            return user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.UserData).Value;
        }
    }
}