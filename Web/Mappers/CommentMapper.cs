using Core.Comments.Dto;
using Web.Models.Comment;

namespace Web.Mappers
{
    public static class CommentMapper
    {
        public static CommentFilterDto ToDto(this CommentFilterViewModel viewModel)
        {
            return new CommentFilterDto
            {
                Email = viewModel.Email,
                Text = viewModel.Text,
                UserName = viewModel.UserName,
            };
        }

        public static CommentListViewModel ToViewModel(this CommentListDto dto)
        {
            return new CommentListViewModel
            {
                AddDate = dto.AddDate,
                Email = dto.Email,
                Id = dto.Id,
                Text = dto.Text,
                UserName = dto.UserName,
            };
        }

        public static AddCommentDto ToDto(this AddCommentViewModel viewModel, string userId)
        {
            return new AddCommentDto
            {
                Email = viewModel?.Email,
                Text = viewModel?.Text,
                UserId = userId
            };
        }
    }
}
