using Core.Base.Dto;
using Core.Base.Repos;
using Core.Packs.Dto;

namespace Core.Packs.Repos
{
    public interface IPackRepo : IRepo<Entities.Pack>
    {
        PagedListDto<PackListDto> Search(PageRequestDto<PackFilterDto> dto);
    }
}
