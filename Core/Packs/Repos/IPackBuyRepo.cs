using Core.Base.Dto;
using Core.Base.Repos;
using Core.Packs.Dto;
using Core.Packs.Entities;

namespace Core.Packs.Repos
{
    public interface IPackBuyRepo : IRepo<PackBuy>
    {
        PackBuy GetCurrentByUserId(string userId);
        PagedListDto<PackBuyListDto> Search(PageRequestDto<PackBuyListFilterDto> dto);
        PackBuy HasActivePack(string userId);
    }
}
