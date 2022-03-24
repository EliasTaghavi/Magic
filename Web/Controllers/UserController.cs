using Core.File.Managers;
using Core.Identity.Entities;
using Core.Identity.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Web.Helper;
using Web.Mappers;
using Web.Models;
using Web.Models.File;
using Web.Models.User;

namespace Web.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserManager UserManager;
        private readonly IFileManager fileManager;

        public UserController(IUserManager userManager, IFileManager fileManager)
        {
            UserManager = userManager;
            this.fileManager = fileManager;
        }

        [HttpPost]
        public IActionResult Create(CreateUserViewModel viewModel)
        {
            Core.Identity.Dto.CreateUserDto dto = viewModel.ToDto();
            var response = UserManager.CreateByPhone(dto);
            return Utils.BuildResult(response);
        }

        [HttpGet]
        [Authorize]
        public IActionResult ProfileDetails()
        {
            try
            {
                string userId = User.Claims.First(x => x.Type == ClaimTypes.UserData).Value;
                User user = UserManager.GetProfileDetails(userId).Result;
                return Ok(user);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult FillData([FromForm] UserFillDataViewModel viewModel)
        {
            var dto = viewModel.ToDto();
            var fileViewModel = new IdentityFileModel
            {
                Identity = viewModel.Identity,
                Selfie = viewModel.Selfie,
            };

            string userId = User.Claims.First(x => x.Type == ClaimTypes.UserData).Value;
            var fileDto = fileViewModel.ToDto(userId);
            var response = UserManager.FillUserData(dto, userId);
            var fileResponse = fileManager.UploadIdentities(fileDto);
            if (!fileResponse.Success)
            {
                return Ok(fileResponse);
            }
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God,Support")]
        public IActionResult List(PageRequestViewModel<UserListFilterViewModel> viewModel)
        {
            var dto = viewModel.ToDto(mv => mv.ToDto());
            var response = UserManager.Search(dto);
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God,Support")]
        public IActionResult Confirm(ConfirmUserViewModel viewModel)
        {
            var dto = viewModel.ToDto();
            var response = UserManager.Confirm(dto);
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God,Support")]
        public IActionResult Lock([FromQuery] string id)
        {
            var response = UserManager.Lock(id);
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God,Support")]
        public IActionResult Reject(RejectMessageViewModel viewModel)
        {
            var dto = viewModel.ToDto();
            var response = UserManager.Reject(dto);
            return Ok(response);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,God")]
        public IActionResult GetLastFiveNewUser()
        {
            var response = UserManager.GetLastFiveNewUser();
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }

        [HttpGet]
        [Authorize(Roles = "Admin,God")]
        public IActionResult GetRank()
        {
            var response = UserManager.GetRank();
            return Ok(response);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,God,Support")]
        public IActionResult GetTypes()
        {
            var response = UserManager.GetTypes();
            return Ok(response);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetQR()
        {
            var userId = User.GetUserId();
            var response = UserManager.GetQR(userId);
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public IActionResult ChangePassword(ChangePasswordViewModel model)
        {
            var userId = User.GetUserId();
            var dto = model.ToDto(userId);
            var response = UserManager.ChangePassword(dto);
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult CreateExpert(CreateExpertViewModel model)
        {
            var dto = model.ToDto();

            var fileViewModel = new IdentityFileModel
            {
                Identity = model.Identity,
                Selfie = model.Selfie,
            };

            var response = UserManager.CreateExpert(dto);

            var fileDto = fileViewModel.ToDto(response.Result);
            var fileResponse = fileManager.UploadIdentities(fileDto);
            if (!fileResponse.Success)
            {
                return Ok(fileResponse);
            }
            return Ok(response);
        }
    }
}
