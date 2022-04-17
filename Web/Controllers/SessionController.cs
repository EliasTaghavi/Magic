using Core.File.Managers;
using Core.Identity.Managers;
using Core.Packs.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models.Session;

namespace Web.Controllers
{
    public class SessionController : BaseController
    {
        private readonly ISessionManager SessionManager;
        private readonly IPackManager packManager;
        private readonly IFileManager fileManager;

        public SessionController(ISessionManager sessionManager, IPackManager packManager, IFileManager fileManager)
        {
            SessionManager = sessionManager;
            this.packManager = packManager;
            this.fileManager = fileManager;
        }

        [HttpPost]
        public IActionResult CreateByPhone(PSessionCreateModel model)
        {
            var dto = model.ToDto();
            var response = SessionManager.RequsetSessionByPhone(dto);
            return Ok(response);
        }

        [HttpPost]
        public IActionResult CreateByUP(UPSessionCreateModel model)
        {

            string ip = HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = SessionManager.CreateByUP(model.ToDto(ip));
            var responsePack = packManager.GetCurrent(response?.Result?.UserId);
            var selfieUrl = fileManager.GetSelfie(response?.Result?.UserId);
            return Ok(response.CreateViewModel(view => view.ToVerifiedUserViewModel(responsePack.Success, selfieUrl.Result, "")));
        }

        [Authorize]
        [HttpGet]
        public IActionResult Delete()
        {
            try
            {
                string authHeader = HttpContext.Request.Headers["authorization"];
                SessionManager.Delete(authHeader);
                return Ok("Bye");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult VerifyTokenByPhone(VerifyTokenPhoneModel model)
        {
            string ip = HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = SessionManager.VerifyTokenByPhone(model.ToDto(ip));
            var responsePack = packManager.GetCurrent(response.Result.UserId);
            var selfieUrl = fileManager.GetSelfie(response.Result.UserId);
            var identityUrl = fileManager.GetIdentity(response.Result.UserId);
            return Ok(response.CreateViewModel(view => view.ToVerifiedUserViewModel(responsePack.Success, selfieUrl.Result, identityUrl.Result)));
        }
    }
}
