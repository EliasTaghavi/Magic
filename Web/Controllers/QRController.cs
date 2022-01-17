using Core.QRString.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;

namespace Web.Controllers
{
    public class QRController : BaseController
    {
        private readonly IQRStringManager qRStringManager;

        public QRController(IQRStringManager qRStringManager)
        {
            this.qRStringManager = qRStringManager;
        }

        [HttpGet]
        [Authorize]
        public IActionResult CreateNew()
        {
            var userId = User.GetUserId();
            var response = qRStringManager.CreateNewQR(userId);
            return Ok(response);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetCurrent()
        {
            var userId = User.GetUserId();
            var response = qRStringManager.GetCurrent(userId);
            return Ok(response);
        }
    }
}
