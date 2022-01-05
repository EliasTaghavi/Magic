﻿using Core.Pack.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parbad;
using Web.Helper;
using Web.Mappers;
using Web.Models.Pack;

namespace Web.Controllers
{
    public class PaymentController : BaseController
    {
        private readonly IPackBuyManager packBuyManager;
        private readonly IOnlinePayment onlinePayment;

        public PaymentController(IPackBuyManager packBuyManager, IOnlinePayment onlinePayment)
        {
            this.packBuyManager = packBuyManager;
            this.onlinePayment = onlinePayment;
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateInvoice([FromBody] CreateInvoiceViewModel viewModel)
        {
            var userId = User.GetUserId();
            var dto = viewModel.ToDto(userId);
            var response = packBuyManager.CreateInvoice(dto);
            return Ok(response.Result.GatewayTransporter.Descriptor.Url);
        }

        [HttpGet, HttpPost]
        public IActionResult Verify()
        {
            var invoice = onlinePayment.Fetch();

            
            var verifyResult = onlinePayment.Verify(invoice);
            

            return Ok(verifyResult);
        }
    }
}