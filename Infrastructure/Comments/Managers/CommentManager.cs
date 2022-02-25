using Core.Base.Dto;
using Core.Base.Entities;
using Core.Comments.Dto;
using Core.Comments.Managers;
using Core.Comments.Repos;
using Core.Comments.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Comments.Managers
{
    public class CommentManager : ICommentManager
    {
        private readonly ICommentRepo commentRepo;

        public CommentManager(ICommentRepo commentRepo)
        {
            this.commentRepo = commentRepo;
        }

        public ManagerResult<bool> Add(AddCommentDto dto)
        {
            var model = dto.ToDataModel();
            var result = commentRepo.Save(model);
            return new ManagerResult<bool>(result);
        }

        public ManagerResult<PagedListDto<CommentListDto>> Search(PageRequestDto<CommentFilterDto> dto)
        {
            var result = commentRepo.Search(dto);
            return new ManagerResult<PagedListDto<CommentListDto>>
            {
                Result = new PagedListDto<CommentListDto>
                {
                    Count = result.Count,
                    Items = result.Items.Select(x => x.ToDto()).ToList()
                }
            };
        }
    }
}
