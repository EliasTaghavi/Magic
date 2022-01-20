using Core.Packs.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parbad;
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

        public PaymentController(IPackBuyManager packBuyManager, IOnlinePayment onlinePayment)
        {
            this.packBuyManager = packBuyManager;
            this.onlinePayment = onlinePayment;
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateInvoice(CreateInvoiceViewModel viewModel)
        {
            string callBackUrl = Url.Action("Verify", "Payment", null, Request.Scheme);
            var userId = User.GetUserId();
            var dto = viewModel.ToDto(userId);
            var response = packBuyManager.CreateInvoice(dto, callBackUrl);
            if (!response.Success)
            {
                return Ok(response);
            }
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
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,God")]
        public IActionResult SetMinLevel([FromQuery] int min)
        {
            var response = packBuyManager.SetMinLevel(min);
            return Ok(response);
        }
    }
}
