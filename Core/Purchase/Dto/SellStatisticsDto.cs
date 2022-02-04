using Core.Base.Dto;

namespace Core.Purchase.Dto
{
    public class SellStatisticsDto
    {
        public List<TwoColumnChartDto<decimal>> Sell { get; set; }
    }
}
