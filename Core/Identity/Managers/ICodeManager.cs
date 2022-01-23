using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Identity.Managers
{
    public interface ICodeManager
    {
        ManagerResult<PagedListDto<CodeListDto>> Search(PageRequestDto<CodeListFilterDto> dto);
    }
}
