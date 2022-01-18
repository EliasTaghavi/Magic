using Core.Base.Entities;

namespace Core.Shops.Entities
{
    public class ShopOff : BaseEntity
    {
        public int Percentage { get; set; }
        public string ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
