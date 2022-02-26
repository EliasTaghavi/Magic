using Core.Comments.Dto;
using Core.Comments.Entities;

namespace Core.Comments.Mapper
{
    public static class CommentMapper
    {
        public static CommentListDto ToDto(this Comment comment)
        {
            return new CommentListDto
            {
                AddDate = comment.CreatedDate,
                Email = comment.Email,
                Text = comment.Text,
                UserName = $"{comment.User.Name} {comment.User.Surname}",
                Id = comment.Id,
            };
        }

        public static Comment ToDataModel(this AddCommentDto dto)
        {
            return new Comment
            {
                Email = dto.Email,
                ObjectState = Base.Enums.ObjectState.Added,
                Text = dto.Text,
                UserId = dto.UserId,
            };
        }
    }
}
