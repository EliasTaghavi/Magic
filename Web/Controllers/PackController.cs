using Core.Pack.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Models;
using Web.Models.Pack;

namespace Web.Controllers
{
    public class PackController : BaseController
    {
        private readonly IPackManager packManager;

        public PackController(IPackManager packManager)
        {
            this.packManager = packManager;
        }

        [HttpPost]
        [Authorize(Roles ="Admin,God")]
        public IActionResult Search([FromBody] PageRequestViewModel<PackFilterViewModel> viewModel)
        {
            return Ok();
        }
    }
}
