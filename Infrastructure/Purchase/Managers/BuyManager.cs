using Core.Base.Entities;
using Core.Base.Enums;
using Core.Identity.Repos;
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

        public BuyManager(IBuyRepo buyRepo,
                          IShopRepo shopRepo,
                          IUserRepo userRepo)
        {
            this.buyRepo = buyRepo;
            this.shopRepo = shopRepo;
            this.userRepo = userRepo;
        }

        public ManagerResult<bool> Save(SaveBuyDto dto)
        {
            var shop = shopRepo.ReadByUserId(dto.ShopKeeperId);
            var discount = shop.Offs?.FirstOrDefault()?.Percentage ?? 0;
            var shopper = userRepo.ReadByQR(dto.ShopperQR);
            var afterDiscount = dto.OrderAmount - (dto.OrderAmount * (discount / 100));

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
