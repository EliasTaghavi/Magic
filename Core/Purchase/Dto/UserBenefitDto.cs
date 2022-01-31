using Core.Base.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Purchase.Dto
{
    public class UserBenefitDto
    {
        public decimal TotalDiscount { get; set; }
        public decimal LastPackDiscount { get; set; }
        public List<LineChartDto<decimal>> EachShopBuy { get; set; }
    }
}
