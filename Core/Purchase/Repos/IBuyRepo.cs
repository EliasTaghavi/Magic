using Core.Base.Dto;
using Core.Base.Repos;
using Core.Purchase.Dto;
using Core.Purchase.Entities;

namespace Core.Purchase.Repos
{
    public interface IBuyRepo : IRepo<Buy>
    {
        decimal GetTotalDiscount(string userId, DateTime? start = null, DateTime? end = null);
        List<LineChartDto<decimal>> GetEachShopBuy(string userId);
        List<LastBuyDto> GetTenLastBuyer(string id);
    }
}
