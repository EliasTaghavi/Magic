using Core.Base.Entities;
using Core.Identity.Entities;

namespace Core.Pack.Entities
{
    public class PackBuy : BaseEntity
    {
        public string PackId { get; set; }
        public Pack Pack { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public long TrackingNumber { get; set; }
        public string GatewayName { get; set; }
        public bool? PayStatus { get; set; }
    }
}
