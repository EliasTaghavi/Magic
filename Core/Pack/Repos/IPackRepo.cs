using Core.Base.Dto;
using Core.Base.Repos;
using Core.Pack.Dto;

namespace Core.Pack.Repos
{
    public interface IPackRepo : IRepo<Entities.Pack>
    {
        PagedListDto<PackListDto> Search(PageRequestDto<PackFilterDto> dto);
    }
}
