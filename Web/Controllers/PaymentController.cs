﻿using Core.Base;
using Core.Base.Entities;
using Core.Base.Settings;
using Core.Pack.Managers;
using Core.Shop.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parbad;
using System.Collections.Generic;
using Web.Helper;
using Web.Mappers;
using Web.Models;
using Web.Models.Pack;
using Web.Models.Payment;

namespace Web.Controllers
{
    public class PaymentController : BaseController
    {
        private readonly IPackBuyManager packBuyManager;
        private readonly IOnlinePayment onlinePayment;
        private readonly IWritableOptions<MinSettings> writableOptions;

        public PaymentController(IPackBuyManager packBuyManager, IOnlinePayment onlinePayment, IWritableOptions<MinSettings> writableOptions)
        {
            this.packBuyManager = packBuyManager;
            this.onlinePayment = onlinePayment;
            this.writableOptions = writableOptions;
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateInvoice([FromBody] CreateInvoiceViewModel viewModel)
        {
            string callBackUrl = Url.Action("Verify", "Payment", null, Request.Scheme);
            var userId = User.GetUserId();
            var dto = viewModel.ToDto(userId);
            var response = packBuyManager.CreateInvoice(dto, callBackUrl);
            return Ok(response.Result.GatewayTransporter.Descriptor.Url);
        }

        [HttpGet, HttpPost]
        public IActionResult Verify()
        {
            var invoice = onlinePayment.Fetch();


            var verifyResult = onlinePayment.Verify(invoice);

            var response = packBuyManager.Verify(verifyResult);


            return Redirect($"../../user-panel?code={verifyResult.TransactionCode}&status={verifyResult.Status}");
        }

        [HttpGet]
        [Authorize(Roles = "Admin,God")]
        public IActionResult GetLastFiveNewPayment()
        {
            var response = packBuyManager.GetLastFiveNewPayment();
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }

        [HttpGet]
        [Authorize(Roles = "Admin,God")]
        public IActionResult GetPaymentLineChart()
        {
            var response = packBuyManager.GetPaymentLineChart();
            return Ok(response.CreateViewModel(x => x.ToDataLabelViewModel()));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult Search(PageRequestViewModel<PackBuyListFilterViewModel> viewModel)
        {
            var dto = viewModel.ToDto(x => x.ToDto());
            var response = packBuyManager.Search(dto);
            return Ok(response.CreateViewModel(x => x.ToViewModel(y => y.ToViewModel())));
        }

        [HttpGet]
        [Authorize(Roles = "Admin,God")]
        public IActionResult GetRank()
        {
            var response = packBuyManager.GetRank();
            (int, List<ShopRefCodeCountDto>) xResponse = (writableOptions.Value.Min, response.Result);
            return Ok(new ManagerResult<(int, List<ShopRefCodeCountDto>)>(xResponse));
        }
    }
}
