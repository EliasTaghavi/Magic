using Core.Base.Dto;
using Core.Comments.Dto;
using Core.Comments.Entities;
using Core.Comments.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Comments.Repos
{
    public class CommentRepo : Repo<Comment>, ICommentRepo
    {
        public CommentRepo(OffDbContext Context) : base(Context)
        {

        }

        public PagedListDto<Comment> Search(PageRequestDto<CommentFilterDto> dto)
        {
            var query = GetSet();
            if (!string.IsNullOrEmpty(dto.MetaData.Email))
            {
                query = query.Where(x => x.Email.Contains(dto.MetaData.Email));
            }
            if (!string.IsNullOrEmpty(dto.MetaData.UserName))
            {
                query = query.Where(x => x.User.Surname.Contains(dto.MetaData.UserName));
            }
            if (!string.IsNullOrEmpty(dto.MetaData.Text))
            {
                query = query.Where(x => x.Text.Contains(dto.MetaData.Text));
            }

            int count = query.Count();
            var result = query.Include(x => x.User)
                              .Skip((dto.Index - 1) * dto.Size)
                              .Take(dto.Size)
                              .OrderByDescending(x => x.CreatedDate)
                              .ToList();
            return new PagedListDto<Comment>
            {
                Count = count,
                Items = result
            };
        }
    }
}
