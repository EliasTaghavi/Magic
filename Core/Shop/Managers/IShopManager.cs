using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Shop.Dto;

namespace Core.Shop.Managers
{
    public interface IShopManager
    {
        ManagerResult<bool> AddPhotos(AddPhotosForShopDto dto);
        ManagerResult<VerifiedUserWithShopDto> VerifyTokenByPhoneForShop(VerifyTokenPhoneDto verifyTokenPhoneDto);
        ManagerResult<bool> Create(CreateShopDto dto);
    }
}
