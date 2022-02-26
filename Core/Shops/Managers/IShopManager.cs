using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Shops.Dto;

namespace Core.Shops.Managers
{
    public interface IShopManager
    {
        ManagerResult<bool> AddPhotos(AddPhotosForShopDto dto);
        ManagerResult<VerifiedUserWithShopDto> VerifyTokenByPhoneForShop(VerifyTokenPhoneDto verifyTokenPhoneDto);
        ManagerResult<bool> Create(CreateShopDto dto);
        ManagerResult<PagedListDto<ShopWithUserDto>> Search(PageRequestDto<ShopListFilterDto> filterDto);
        ManagerResult<bool> Delete(string id);
        ManagerResult<string> FindByRef(string refCode);
        ManagerResult<bool> UpdateOff(UpdateShopOffDto dto);
        ManagerResult<List<ShopSimpleDto>> GetList();
        ManagerResult<ShopDetailsDto> Get(string id);
        ManagerResult<bool> DeletePhoto(string photoId);
        ManagerResult<List<string>> GetPhotos(string Id);
    }
}
