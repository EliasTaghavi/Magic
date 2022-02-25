using Core.Base.Dto;
using Core.Base.Repos;
using Core.Comments.Dto;
using Core.Comments.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Comments.Repos
{
    public interface ICommentRepo : IRepo<Comment>
    {
        PagedListDto<Comment> Search(PageRequestDto<CommentFilterDto> dto);
    }
}
