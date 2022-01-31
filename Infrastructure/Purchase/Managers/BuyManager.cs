using Core.Base.Entities;
using Core.Base.Enums;
using Core.Identity.Repos;
using Core.Packs.Repos;
using Core.Purchase.Dto;
using Core.Purchase.Entities;
using Core.Purchase.Managers;
using Core.Purchase.Repos;
using Core.Shops.Repos;

namespace Infrastructure.Purchase.Managers
{
    public class BuyManager : IBuyManager
    {
        private readonly IBuyRepo buyRepo;
        private readonly IShopRepo shopRepo;
        private readonly IUserRepo userRepo;
        private readonly IPackBuyRepo packBuyRepo;

        public BuyManager(IBuyRepo buyRepo,
                          IShopRepo shopRepo,
                          IUserRepo userRepo, 
                          IPackBuyRepo packBuyRepo)
        {
            this.buyRepo = buyRepo;
            this.shopRepo = shopRepo;
            this.userRepo = userRepo;
            this.packBuyRepo = packBuyRepo;
        }

        public ManagerResult<UserBenefitDto> GetBenefit(string userId)
        {
            var totalDiscount = buyRepo.GetTotalDiscount(userId);
            decimal lastPackBenefit = 0;
            var lastPack = packBuyRepo.GetCurrentByUserId(userId);
            if (lastPack.PayStatus.Value)
            {
                var startDate = lastPack.PayDate.Value;
                var endDate = startDate.AddDays(lastPack.Pack.DayCount);
                lastPackBenefit = buyRepo.GetTotalDiscount(userId,startDate,endDate);
            }
            var eachShopBuy = buyRepo.GetEachShopBuy(userId);
            var result = new UserBenefitDto
            {
                EachShopBuy = eachShopBuy,
                LastPackDiscount = lastPackBenefit,
                TotalDiscount = totalDiscount,
            };

            return new ManagerResult<UserBenefitDto>(result);
        }

        public ManagerResult<bool> Save(SaveBuyDto dto)
        {
            var shop = shopRepo.ReadByUserId(dto.ShopKeeperId);
            decimal discount = shop.Offs?.FirstOrDefault()?.Percentage ?? 0;
            var shopper = userRepo.ReadByQR(dto.ShopperQR);
            decimal afterDiscount = dto.OrderAmount - (dto.OrderAmount * discount / 100);

            var buy = new Buy
            {
                AfterDiscount = afterDiscount,
                FullPrice = dto.OrderAmount,
                ObjectState = ObjectState.Added,
                ShopId = shop.Id,
                UserId = shopper.Id,
            };

            var saveResult = buyRepo.Save(buy);

            return new ManagerResult<bool>(saveResult);
        }
    }
}
