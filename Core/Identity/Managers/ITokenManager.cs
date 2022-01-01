using Core.Base.Entities;
using Microsoft.Extensions.Primitives;

namespace Core.Identity.Managers
{
    public interface ITokenManager
    {
        ManagerResult<bool> CurrentIsDisable(StringValues authHeader);

        ManagerResult<string> GetCurrent(StringValues authHeader);

        ManagerResult<bool> SameIP(StringValues authHeader, string ip);
    }
}
