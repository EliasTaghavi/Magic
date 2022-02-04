using Core.Base.Dto;

namespace Core.Purchase.Dto
{
    public class SellStatisticsDto
    {
        public List<LineChartDto<decimal>> Sell { get; set; }
        public List<LineChartDto<decimal>> Discount { get; set; }
    }
}
