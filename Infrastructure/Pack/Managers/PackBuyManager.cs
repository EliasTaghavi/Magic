using Core.Base.Entities;
using Core.Identity.Repos;
using Core.Pack.Dto;
using Core.Pack.Entities;
using Core.Pack.Managers;
using Core.Pack.Repos;
using Parbad;
using Parbad.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Pack.Managers
{
    public class PackBuyManager : IPackBuyManager
    {
        const string CallBackUrl = "https://test.ir/verifypayment";
        private readonly IPackBuyRepo packBuyRepo;
        private readonly IPackRepo packRepo;
        private readonly IUserRepo userRepo;
        private readonly IOnlinePayment onlinePayment;

        public PackBuyManager(IPackBuyRepo packBuyRepo, IPackRepo packRepo, IUserRepo userRepo, IOnlinePayment onlinePayment)
        {
            this.packBuyRepo = packBuyRepo;
            this.packRepo = packRepo;
            this.userRepo = userRepo;
            this.onlinePayment = onlinePayment;
        }

        public ManagerResult<IPaymentRequestResult> CreateInvoice(CreateInvoiceDto dto)
        {
            var user = userRepo.Read(dto.UserId);
            var pack = packRepo.Read(dto.PackId);
            var result = onlinePayment.Request(invoice =>
            {
                invoice
                    .SetAmount(pack.Price)
                    .SetCallbackUrl(CallBackUrl)
                    .SetGateway("ZarinPal")
                    .UseAutoIncrementTrackingNumber();
            });
            var packBuy = new PackBuy
            {
                ObjectState = Core.Base.Enums.ObjectState.Added,
                PackId = pack.Id,
                Pack = pack,
                PayStatus = null,
                TrackingNumber = result.TrackingNumber,
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
    }
}
