using Core.Base.Entities;
using Core.Identity.Entities;
using Core.Shops.Entities;

namespace Core.Purchase.Entities
{
    public class Buy : BaseEntity
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string ShopId { get; set; }
        public Shop Shop { get; set; }
        public decimal FullPrice { get; set; }
        public decimal AfterDiscount { get; set; }
    }
}
