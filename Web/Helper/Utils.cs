using Core.Base.Entities;
using Microsoft.AspNetCore.Mvc;

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
    }
}
