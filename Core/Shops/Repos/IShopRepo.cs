using Core.Base.Dto;
using Core.Base.Repos;
using Core.Shops.Dto;

namespace Core.Shops.Repos
{
    public interface IShopRepo : IRepo<Core.Shops.Entities.Shop>
    {
        Entities.Shop ReadByUserId(string userId);
        PagedListDto<Entities.Shop> Search(PageRequestDto<ShopListFilterDto> filterDto);
        List<string> GerShopsName();
    }
}
