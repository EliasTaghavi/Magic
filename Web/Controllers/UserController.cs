using Core.File.Managers;
using Core.Identity.Entities;
using Core.Identity.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
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
        public IActionResult Create([FromBody] CreateUserViewModel viewModel)
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
        [Authorize(Roles = "Admin,God")]
        public IActionResult List([FromBody] PageRequestViewModel<UserListFilterViewModel> viewModel)
        {
            var dto = viewModel.ToDto(mv => mv.ToDto());
            var response = UserManager.Search(dto);
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult Confirm([FromQuery] string id)
        {
            var response = UserManager.Confirm(id);
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult Lock([FromQuery] string id)
        {
            var response = UserManager.Lock(id);
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult Reject([FromBody] RejectMessageViewModel viewModel)
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
    }
}
