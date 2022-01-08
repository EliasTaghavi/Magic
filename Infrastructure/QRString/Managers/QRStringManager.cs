using Core.Base.Entities;
using Core.File.Repos;
using Core.Identity.Repos;
using Core.Pack.Repos;
using Core.QRString.Dto;
using Core.QRString.Managers;
using Core.QRString.Repos;
using Core.Shop.Repos;
using System;
using System.Linq;

namespace Infrastructure.QRString.Managers
{
    public class QRStringManager : IQRStringManager
    {
        private readonly IUserRepo userRepo;
        private readonly IQRStringRepo qRStringRepo;
        private readonly IShopRepo shopRepo;
        private readonly IAppFileRepo appFileRepo;
        private readonly IPackBuyRepo packBuyRepo;

        public QRStringManager(IUserRepo userRepo, IQRStringRepo qRStringRepo, IShopRepo shopRepo, IAppFileRepo appFileRepo, IPackBuyRepo packBuyRepo)
        {
            this.userRepo = userRepo;
            this.qRStringRepo = qRStringRepo;
            this.shopRepo = shopRepo;
            this.appFileRepo = appFileRepo;
            this.packBuyRepo = packBuyRepo;
        }
        public ManagerResult<string> CreateNewQR(string userId)
        {
            qRStringRepo.DisableAllUserQR(userId);
            var qr = new Core.QRString.Entities.QRString
            {
                Enable = true,
                QR = Guid.NewGuid().ToString(),
                CreatedDate = DateTime.UtcNow,
                UserId = userId,
            };
            qr = qRStringRepo.Create(qr);
            return new ManagerResult<string>(qr.QR, true);
        }

        public ManagerResult<BuyerDto> GetBuyer(ShopBuyerDto dto)
        {
            var buyer = qRStringRepo.ReadByQR(dto.UserId);
            var shop = shopRepo.ReadByUserId(dto.ShoperId);
            if (shop != null && buyer != null)
            {
                var selfie = appFileRepo.GetSet().FirstOrDefault(x => x.UserId == buyer.UserId && x.Type == Core.File.Enums.FileType.Selfie);
                var packBuy = packBuyRepo.GetCurrentByUserId(buyer.UserId);
                var resultDto = new BuyerDto
                {
                    DayRemain = (packBuy.PayDate.Value.AddDays(packBuy.Pack.DayCount) - DateTime.UtcNow).Days,
                    ExpireDate = packBuy.PayDate.Value.AddDays(packBuy.Pack.DayCount),
                    Lastname = buyer.User.Surname,
                    Name = buyer.User.Name,
                    PackStatus = packBuy.PayStatus.Value,
                    SelfieUrl = selfie?.FullName,
                    UserType = Core.Identity.Enums.UserType.Student
                };
                return new ManagerResult<BuyerDto>(resultDto);
            }
            return new ManagerResult<BuyerDto>(null, false);
        }

        public ManagerResult<string> GetCurrent(string userId)
        {
            var qr = qRStringRepo.GetCurrent(userId);
            return new ManagerResult<string>(qr, true);
        }
    }
}
