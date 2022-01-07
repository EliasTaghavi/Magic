using Core.Identity.Managers;
using Core.Shop.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models.Session;

namespace Web.Controllers
{
    public class ShopController : BaseController
    {
        private readonly IHttpContextAccessor accessor;
        private readonly IShopManager shopManager;

        public ShopController(IHttpContextAccessor accessor, IShopManager shopManager)
        {
            this.accessor = accessor;
            this.shopManager = shopManager;
        }

        [HttpPost]
        public IActionResult VerifyTokenByPhone([FromBody] VerifyTokenPhoneModel model)
        {
            string ip = accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = shopManager.VerifyTokenByPhoneForShop(model.ToDto(ip));
            return Ok(response);
        }
    }
}
