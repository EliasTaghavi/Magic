using Core.Base.Dto;
using Core.Shops.Dto;

namespace Core.Purchase.Dto
{
    public class ShopStatisticsDto
    {
        public List<KeyValueDto<string, string>> TenLastBuyer { get; set; }
        public List<KeyValueDto<string, string>> TenLastNewUser { get; set; }
        public ShopRankWithMinDto Rate { get; set; }
    }
}
