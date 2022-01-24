using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Dto;

namespace Core.Identity.Managers
{
    public interface ICodeManager
    {
        ManagerResult<PagedListDto<CodeListDto>> Search(PageRequestDto<CodeListFilterDto> dto);
    }
}
