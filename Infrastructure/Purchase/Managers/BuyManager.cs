using Core;
using Core.Base.Dto;
using Core.Base.Entities;
using Core.Base.Enums;
using Core.Identity.Repos;
using Core.Packs.Managers;
using Core.Packs.Repos;
using Core.Purchase.Dto;
using Core.Purchase.Entities;
using Core.Purchase.Managers;
using Core.Purchase.Repos;
using Core.Shops.Repos;
using System.Globalization;

namespace Infrastructure.Purchase.Managers
{
    public class BuyManager : IBuyManager
    {
        private readonly IBuyRepo buyRepo;
        private readonly IShopRepo shopRepo;
        private readonly IUserRepo userRepo;
        private readonly IPackBuyRepo packBuyRepo;
        private readonly IPackBuyManager packBuyManager;

        public BuyManager(IBuyRepo buyRepo,
                          IShopRepo shopRepo,
                          IUserRepo userRepo,
                          IPackBuyRepo packBuyRepo,
                          IPackBuyManager packBuyManager)
        {
            this.buyRepo = buyRepo;
            this.shopRepo = shopRepo;
            this.userRepo = userRepo;
            this.packBuyRepo = packBuyRepo;
            this.packBuyManager = packBuyManager;
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
                lastPackBenefit = buyRepo.GetTotalDiscount(userId, startDate, endDate);
            }
            var eachShopBuy = buyRepo.GetEachShopBuy(userId);
            var zeroShopBuy = shopRepo.GerShopsName().Except(eachShopBuy.Select(x => x.Label));
            eachShopBuy.AddRange(zeroShopBuy.Select(x => new Core.Base.Dto.LineChartDto<decimal> { Data = 0, Label = x }));
            var result = new UserBenefitDto
            {
                EachShopBuy = eachShopBuy,
                LastPackDiscount = lastPackBenefit,
                TotalDiscount = totalDiscount,
            };

            return new ManagerResult<UserBenefitDto>(result);
        }

        public ManagerResult<SellStatisticsDto> GetSellStatistics(string shopKeeperId)
        {
            var shop = shopRepo.ReadByUserId(shopKeeperId);
            var sellData = new List<TwoColumnChartDto<decimal>>();
            PersianCalendar pc = new();
            int year = pc.GetYear(DateTime.UtcNow);
            for (int i = 0; i < 12; i++)
            {
                DateTime start = new(year, 1 + i, 1, pc);
                DateTime end = i < 11 ? new DateTime(year, 2 + i, 1, pc) : new DateTime(year + 1, 1, 1, pc);
                var month = buyRepo.Bucket().Where(x => x.CreatedDate >= start && x.CreatedDate < end && x.ShopId == shop.Id);
                decimal paid = month.Sum(x => x.FullPrice);
                decimal discount = month.Sum(x => x.FullPrice - x.AfterDiscount);
                sellData.Add(new TwoColumnChartDto<decimal> {  Column1= paid, Column2 = discount, Label = Utils.GetPersianMonthName(i + 1) });
            }
            var result = new SellStatisticsDto
            {
                Sell = sellData
            };
            return new ManagerResult<SellStatisticsDto>(result);
        }

        public ManagerResult<ShopStatisticsDto> GetShopStatistics(string shopKeeperId)
        {
            var shop = shopRepo.ReadByUserId(shopKeeperId);
            var tenLastNewUser = packBuyRepo.GetTenLastNewUserByShopRef(shop.ReferralCode);
            var tenLastBuyer = buyRepo.GetTenLastBuyer(shop.Id);
            var rate = packBuyManager.GetRank().Result;
            var result = new ShopStatisticsDto
            {
                Rate = rate,
                TenLastBuyer = tenLastBuyer,
                TenLastNewUser = tenLastNewUser,
            };
            return new ManagerResult<ShopStatisticsDto>(result);
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
