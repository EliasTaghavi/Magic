using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Dto
{
    public class ShopRankWithMinDto
    {
        public int Min { get; set; }
        public List<ShopRefCodeCountDto> shops { get; set; }
    }
}
