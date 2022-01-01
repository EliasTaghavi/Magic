using Core.Base.Repos;
using Core.Identity.Entities;

namespace Core.Identity.Repos
{
    public interface ITokenRepo : IRepo<AccessToken>
    {
        new void Disable(string jwt);

        AccessToken ReadByJWT(string jwt);
    }
}
