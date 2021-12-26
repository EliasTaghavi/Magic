using Core.Identity.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using Web.Mappers;
using Web.Models.Session;

namespace Web.Controllers
{
    public class SessionController : BaseController
    {
        private readonly ISessionManager SessionManager;
        private readonly IHttpContextAccessor Accessor;

        public SessionController(ISessionManager sessionManager, IHttpContextAccessor accessor)
        {
            SessionManager = sessionManager;
            Accessor = accessor;
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
            string ip = Accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = SessionManager.CreateByUP(model.ToDto(ip));
            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Delete()
        {
            try
            {
                StringValues authHeader = Accessor.HttpContext.Request.Headers["authorization"];
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
            string ip = Accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = SessionManager.VerifyTokenByPhone(model.ToDto(ip));
            return Ok(response);
        }
    }
}
