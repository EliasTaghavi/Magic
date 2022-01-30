using Core.Base.Entities;

namespace Core.Identity.Managers
{
    public interface ITokenManager
    {
        ManagerResult<bool> CurrentIsDisable(string authHeader);

        ManagerResult<string> GetCurrent(string authHeader);

        ManagerResult<bool> SameIP(string authHeader, string ip);
    }
}
