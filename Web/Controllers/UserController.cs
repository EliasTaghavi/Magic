using Core.Identity.Entities;
using Core.Identity.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using Web.Helper;
using Web.Mappers;
using Web.Models.User;

namespace Web.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserManager UserManager;

        public UserController(IUserManager userManager)
        {
            UserManager = userManager;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUserViewModel viewModel)
        {
            Core.Identity.Dto.CreateUserDto dto = viewModel.ToDto();
            Core.Base.Entities.ManagerResult<bool> response = UserManager.CreateByPhone(dto);
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
    }
}
