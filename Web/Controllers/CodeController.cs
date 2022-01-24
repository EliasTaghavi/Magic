using Core.Identity.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models;
using Web.Models.User;

namespace Web.Controllers
{
    public class CodeController : BaseController
    {
        private readonly ICodeManager codeManager;

        public CodeController(ICodeManager codeManager)
        {
            this.codeManager = codeManager;
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult Search(PageRequestViewModel<CodeListFilterViewModel> viewModel)
        {
            var dto = viewModel.ToDto();
            var response = codeManager.Search(dto);
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }
    }
}
