using System.Collections.Generic;

namespace Core.Shops.Dto
{
    public class ShopRankWithMinDto
    {
        public int Min { get; set; }
        public List<ShopRefCodeCountDto> Shops { get; set; }
    }
}
