using Core.Base.Dto;
using Core.Base.Entities;
using Core.Comments.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Comments.Managers
{
    public interface ICommentManager
    {
        ManagerResult<PagedListDto<CommentListDto>> Search(PageRequestDto<CommentFilterDto> dto);
        ManagerResult<bool> Add(AddCommentDto dto);
    }
}
