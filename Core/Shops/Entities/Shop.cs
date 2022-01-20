using Core.Base.Entities;
using Core.File.Entities;
using Core.Identity.Entities;

namespace Core.Shops.Entities
{
    public class Shop : BaseEntity
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public ICollection<AppFile> Photos { get; set; }
        public string ReferralCode { get; set; }
        public ICollection<ShopOff> Offs { get; set; }
    }
}
