﻿using Core.Pack.Entities;
using Core.Pack.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Helper;
using Web.Mappers;
using Web.Models;
using Web.Models.Pack;

namespace Web.Controllers
{
    public class PackController : BaseController
    {
        private readonly IPackManager packManager;

        public PackController(IPackManager packManager)
        {
            this.packManager = packManager;
        }

        [HttpPost]
        [Authorize]
        public IActionResult List([FromBody] PageRequestViewModel<PackFilterViewModel> viewModel)
        {
            var dto = viewModel.ToDto(mv => mv.ToDto());
            var response = packManager.Search(dto);
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult Create([FromBody] CreatePackViewModel viewModel)
        {
            var data = viewModel.ToDataModel();
            var response = packManager.Create(data);
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult Delete([FromQuery]string id)
        {
            var response = packManager.Delete(id);
            return Ok(response);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetCurrent()
        {
            var userId = User.GetUserId();
            var response = packManager.GetCurrent(userId);
            return Ok(response.CreateViewModel(x => x.ToViewModel()));
        }
    }
}
