using Core.Purchase.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models.Purchase;

namespace Web.Controllers
{
    public class BuyController : BaseController
    {
        private readonly IBuyManager buyManager;

        public BuyController(IBuyManager buyManager)
        {
            this.buyManager = buyManager;
        }

        [HttpPost]
        [Authorize(Roles = "Shop")]
        public IActionResult Save(SaveBuyViewModel viewModel)
        {
            var shopKeeperId = User.GetUserId();
            var dto = viewModel.ToDto(shopKeeperId);
            var response = buyManager.Save(dto);
            return Ok(response);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetBenefit()
        {
            var userId = User.GetUserId();
            var response = buyManager.GetBenefit(userId);
            return Ok(response);
        }

        [HttpGet]
        [Authorize(Roles ="Shop")]
        public IActionResult GetShopStatistics()
        {
            var shopKeeperId = User.GetUserId();
            var response = buyManager.GetShopStatistics(shopKeeperId);
            return Ok(response);
        }

        [HttpGet]
        [Authorize(Roles = "Shop")]
        public IActionResult GetSellStatistics()
        {
            var shopKeeperId = User.GetUserId();
            var response = buyManager.GetSellStatistics(shopKeeperId);
            return Ok(response);
        }
    }
}
