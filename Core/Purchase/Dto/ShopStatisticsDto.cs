using Core.Base.Dto;

namespace Core.Purchase.Dto
{
    public class ShopStatisticsDto
    {
        public List<KeyValueDto<string, string>> TenLastBuyer { get; set; }
        public List<KeyValueDto<string, string>> TenLastNewUser { get; set; }
        public int Rate { get; set; }
    }
}
