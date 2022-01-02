using Core.Base.Dto;
using Core.Base.Entities;
using Core.Base.Repos;
using Core.Pack.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Pack.Repos
{
    public interface IPackRepo : IRepo<Entities.Pack>
    {
        PagedListDto<PackListDto> Search(PageRequestDto<PackFilterDto> dto);
    }
}
