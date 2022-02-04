using Core.Base.Dto;

namespace Core.Purchase.Dto
{
    public class UserBenefitDto
    {
        public decimal TotalDiscount { get; set; }
        public decimal LastPackDiscount { get; set; }
        public List<LineChartDto<decimal>> EachShopBuy { get; set; }
    }
}
