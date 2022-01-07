using Core.Identity.Managers;
using Core.QRString.Managers;
using Core.Shop.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models.Session;
using Web.Models.Shop;

namespace Web.Controllers
{
    public class ShopController : BaseController
    {
        private readonly IHttpContextAccessor accessor;
        private readonly IShopManager shopManager;
        private readonly IQRStringManager qRStringManager;

        public ShopController(IHttpContextAccessor accessor, IShopManager shopManager, IQRStringManager qRStringManager)
        {
            this.accessor = accessor;
            this.shopManager = shopManager;
            this.qRStringManager = qRStringManager;
        }

        [HttpPost]
        public IActionResult VerifyTokenByPhone([FromBody] VerifyTokenPhoneModel model)
        {
            string ip = accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = shopManager.VerifyTokenByPhoneForShop(model.ToDto(ip));
            return Ok(response);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetBuyer([FromBody] GetBuyerViewModel viewModel) 
        {
            var shoperId = User.GetUserId();
            var dto = viewModel.ToDto(shoperId);
            var response = qRStringManager.GetBuyer(dto);
            return Ok(response);
        }
    }
}
