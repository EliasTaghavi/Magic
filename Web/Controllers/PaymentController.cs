using Core.Pack.Managers;
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
    }
}
