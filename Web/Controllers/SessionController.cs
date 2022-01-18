using Core.Identity.Managers;
using Core.Packs.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Web.Helper;
using Web.Mappers;
using Web.Models.Session;

namespace Web.Controllers
{
    public class SessionController : BaseController
    {
        private readonly ISessionManager SessionManager;
        private readonly IPackManager packManager;

        public SessionController(ISessionManager sessionManager, IPackManager packManager)
        {
            SessionManager = sessionManager;
            this.packManager = packManager;
        }

        [HttpPost]
        public IActionResult CreateByPhone([FromBody] PSessionCreateModel model)
        {
            var response = SessionManager.RequsetSessionByPhone(model.Phone);
            return Ok(response);
        }

        [HttpPost]
        public IActionResult CreateByUP([FromBody] UPSessionCreateModel model)
        {
            
            string ip = this.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = SessionManager.CreateByUP(model.ToDto(ip));
            return Ok(response.CreateViewModel(view => view.ToVerifiedUserViewModel(false)));
        }

        [Authorize]
        [HttpGet]
        public IActionResult Delete()
        {
            try
            {
                string authHeader = this.HttpContext.Request.Headers["authorization"];
                SessionManager.Delete(authHeader);
                return Ok("Bye");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult VerifyTokenByPhone([FromBody] VerifyTokenPhoneModel model)
        {
            string ip = this.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = SessionManager.VerifyTokenByPhone(model.ToDto(ip));
            var responsePack = packManager.GetCurrent(response.Result.UserId);
            return Ok(response.CreateViewModel(view => view.ToVerifiedUserViewModel(responsePack.Success)));
        }
    }
}
