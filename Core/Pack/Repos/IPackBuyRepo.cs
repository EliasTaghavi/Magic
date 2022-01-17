using Core.Base.Dto;
using Core.Base.Repos;
using Core.Pack.Dto;
using Core.Pack.Entities;

namespace Core.Pack.Repos
{
    public interface IPackBuyRepo : IRepo<PackBuy>
    {
        PackBuy GetCurrentByUserId(string userId);
        PagedListDto<PackBuyListDto> Search(PageRequestDto<PackBuyListFilterDto> dto);
    }
}
