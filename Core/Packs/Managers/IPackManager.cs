using Core.Base.Dto;
using Core.Base.Entities;
using Core.Packs.Dto;

namespace Core.Packs.Managers
{
    public interface IPackManager
    {
        ManagerResult<PagedListDto<PackListDto>> Search(PageRequestDto<PackFilterDto> dto);
        ManagerResult<bool> Create(Entities.Pack data);
        ManagerResult<bool> Delete(string id);
        ManagerResult<CurrentPackDto> GetCurrent(string userId);
        ManagerResult<PagedListPackWithUserTypeOffDto> List(PageRequestDto<PackFilterDto> dto, string userId);
    }
}
