using Core.File.Managers;
using Core.Identity.Managers;
using Core.Packs.Managers;
using Core.Shops.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models;
using Web.Models.Session;
using Web.Models.Shop;

namespace Web.Controllers
{
    public class ShopController : BaseController
    {
        private readonly IHttpContextAccessor accessor;
        private readonly IShopManager shopManager;
        private readonly IUserManager userManager;
        private readonly IFileManager fileManager;
        private readonly IPackManager packManager;
        private readonly ISessionManager sessionManager;

        public ShopController(IHttpContextAccessor accessor,
                              IShopManager shopManager,
                              IUserManager userManager,
                              IFileManager fileManager,
                              IPackManager packManager,
                              ISessionManager sessionManager)
        {
            this.accessor = accessor;
            this.shopManager = shopManager;
            this.userManager = userManager;
            this.fileManager = fileManager;
            this.packManager = packManager;
            this.sessionManager = sessionManager;
        }

        [HttpPost]
        public IActionResult VerifyTokenByPhone(VerifyTokenPhoneModel model)
        {
            string ip = accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = shopManager.VerifyTokenByPhoneForShop(model.ToDto(ip));
            return Ok(response);
        }

        [HttpPost]
        public IActionResult CreateByUP(UPSessionCreateModel model)
        {

            string ip = HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();

            var response = sessionManager.CreateByUPShop(model.ToDto(ip));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public IActionResult GetBuyer(GetBuyerViewModel viewModel)
        {
            var shoperId = User.GetUserId();
            var dto = viewModel.ToDto(shoperId);
            var response = userManager.GetBuyer(dto);
            return Ok(response.CreateViewModel(x => x?.ToViewModel()));
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create(CreateShopViewModel viewModel)
        {
            var dto = viewModel.ToDto();
            var response = shopManager.Create(dto);
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Search(PageRequestViewModel<ShopListFilterViewModel> viewModel)
        {
            var dto = viewModel.ToDto(x => x.ToDto());
            var response = shopManager.Search(dto);
            return Ok(response.CreateViewModel(x => x.ToViewModel(x => x.ToViewModel())));
        }

        [HttpPost]
        [Authorize]
        public IActionResult Delete([FromQuery] string id)
        {
            var response = shopManager.Delete(id);
            return Ok(response);
        }

        [HttpPost]
        public IActionResult FindByRef([FromQuery] string refCode)
        {
            var response = shopManager.FindByRef(refCode);
            return Ok(response);
        }

        [HttpPost]
        public IActionResult UpdateOff(UpdateShopOffViewModel viewModel)
        {
            var dto = viewModel.ToDto();
            var response = shopManager.UpdateOff(dto);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult List()
        {
            var response = shopManager.GetList();
            return Ok(response);
        }

        [HttpGet]
        public IActionResult Get([FromQuery] string id)
        {
            var response = shopManager.Get(id);
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult AddPhotos([FromForm] AddShopPhotosViewModel viewModel)
        {
            var dto = viewModel.ToDto();
            var response = shopManager.AddPhotos(dto);
            if (viewModel.Deleted != null)
            {
                foreach (var item in viewModel.Deleted)
                {
                    shopManager.DeletePhoto(item);
                }
            }
            
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult DeletePhoto(DeleteShopPhotoViewModel viewModel)
        {
            var response = shopManager.DeletePhoto(viewModel.PhotoId);
            return Ok(response);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,God")]
        public IActionResult GetPhotos([FromQuery] string id)
        {
            var response = shopManager.GetPhotos(id);
            return Ok(response);
        }
    }
}
