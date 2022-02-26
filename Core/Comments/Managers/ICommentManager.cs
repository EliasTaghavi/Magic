using Core.Base.Dto;
using Core.Base.Entities;
using Core.Comments.Dto;

namespace Core.Comments.Managers
{
    public interface ICommentManager
    {
        ManagerResult<PagedListDto<CommentListDto>> Search(PageRequestDto<CommentFilterDto> dto);
        ManagerResult<bool> Add(AddCommentDto dto);
    }
}
