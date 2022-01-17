using Core.Base.Dto;
using Core.Base.Repos;
using Core.Shop.Dto;

namespace Core.Shop.Repos
{
    public interface IShopRepo : IRepo<Core.Shop.Entities.Shop>
    {
        Entities.Shop ReadByUserId(string userId);
        PagedListDto<Entities.Shop> Search(PageRequestDto<ShopListFilterDto> filterDto);
    }
}
