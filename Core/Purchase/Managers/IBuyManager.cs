using Core.Base.Entities;
using Core.Purchase.Dto;

namespace Core.Purchase.Managers
{
    public interface IBuyManager
    {
        ManagerResult<bool> Save(SaveBuyDto dto);
        ManagerResult<UserBenefitDto> GetBenefit(string userId);
        ManagerResult<ShopStatisticsDto> GetShopStatistics(string shopKeeperId);
    }
}
