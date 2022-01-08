using Core.Base.Entities;
using Core.Identity.Repos;
using Core.Pack.Dto;
using Core.Pack.Entities;
using Core.Pack.Managers;
using Core.Pack.Repos;
using Core.QRString.Managers;
using Parbad;
using Parbad.Gateway.ZarinPal;
using System;
using System.Linq;

namespace Infrastructure.Pack.Managers
{
    public class PackBuyManager : IPackBuyManager
    {
        private readonly IQRStringManager qRStringManager;
        private readonly IPackBuyRepo packBuyRepo;
        private readonly IPackRepo packRepo;
        private readonly IUserRepo userRepo;
        private readonly IOnlinePayment onlinePayment;

        public PackBuyManager(IQRStringManager qRStringManager, IPackBuyRepo packBuyRepo, IPackRepo packRepo, IUserRepo userRepo, IOnlinePayment onlinePayment)
        {
            this.qRStringManager = qRStringManager;
            this.packBuyRepo = packBuyRepo;
            this.packRepo = packRepo;
            this.userRepo = userRepo;
            this.onlinePayment = onlinePayment;
        }

        public ManagerResult<IPaymentRequestResult> CreateInvoice(CreateInvoiceDto dto, string callBackUrl)
        {
            var user = userRepo.Read(dto.UserId);
            var pack = packRepo.Read(dto.PackId);
            var result = onlinePayment.Request(invoice =>
            {
                invoice.UseZarinPal().UseAutoIncrementTrackingNumber().SetZarinPalData("elias test", "", "09304359576")
                .SetAmount(pack.Price).SetCallbackUrl(callBackUrl);
            });
            var packBuy = new PackBuy
            {
                ObjectState = Core.Base.Enums.ObjectState.Added,
                PackId = pack.Id,
                Pack = pack,
                PayStatus = null,
                TrackingNumber = result.TrackingNumber,
                GatewayName = result.GatewayName,
                User = user,
                UserId = dto.UserId,
            };
            packBuyRepo.Save(packBuy);
            return new ManagerResult<IPaymentRequestResult>(result, result.IsSucceed)
            {
                Message = result.IsSucceed ? "Successful" : result.Message,
                Code = result.IsSucceed ? 200 : 19
            };
        }

        public ManagerResult<bool> Verify(IPaymentVerifyResult result)
        {
            var invoice = packBuyRepo.Bucket().Where(x => x.GatewayName == result.GatewayName && x.TrackingNumber == result.TrackingNumber).FirstOrDefault();
            invoice.PayStatus = result.IsSucceed;
            invoice.PayDate = DateTime.UtcNow;
            packBuyRepo.Update(invoice);
            qRStringManager.CreateNewQR(invoice.UserId);
            if (result.IsSucceed)
            {

            }
            return new ManagerResult<bool>(true);
        }
    }
}
