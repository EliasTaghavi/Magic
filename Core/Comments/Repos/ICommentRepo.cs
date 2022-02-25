using Core.Base.Dto;
using Core.Base.Repos;
using Core.Comments.Dto;
using Core.Comments.Entities;

namespace Core.Comments.Repos
{
    public interface ICommentRepo : IRepo<Comment>
    {
        PagedListDto<Comment> Search(PageRequestDto<CommentFilterDto> dto);
    }
}
