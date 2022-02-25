using Core.Comments.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models;
using Web.Models.Comment;

namespace Web.Controllers
{
    public class CommnetController :BaseController
    {
        private readonly ICommentManager commentManager;

        public CommnetController(ICommentManager commentManager)
        {
            this.commentManager = commentManager;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Search(PageRequestViewModel<CommentFilterViewModel> viewModel)
        {
            var dto = viewModel.ToDto(mv => mv.ToDto());
            var response = commentManager.Search(dto);
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }

        [HttpPost]
        [Authorize]
        public IActionResult Add(AddCommentViewModel viewModel)
        {
            var userId = User.GetUserId();
            var dto = viewModel.ToDto(userId);
            var response = commentManager.Add(dto);
            return Ok(response);
        }
    }
}
