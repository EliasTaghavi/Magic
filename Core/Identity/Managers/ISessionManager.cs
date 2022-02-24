using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Shops.Dto;
using Microsoft.Extensions.Primitives;

namespace Core.Identity.Managers
{
    public interface ISessionManager
    {
        ManagerResult<AccessToken> CreateByUP(UPSessionCreateDto dto);
        ManagerResult<VerifiedUserWithShopDto> CreateByUPShop(UPSessionCreateDto dto);

        ManagerResult<bool> Delete(StringValues authHeader);

        ManagerResult<bool> RequsetSessionByPhone(string Phone);

        ManagerResult<AccessToken> VerifyTokenByPhone(VerifyTokenPhoneDto dto);
    }
}
