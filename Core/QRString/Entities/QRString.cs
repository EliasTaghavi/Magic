using Core.Base.Entities;
using Core.Identity.Entities;

namespace Core.QRString.Entities
{
    public class QRString : BaseEntity
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string QR { get; set; }
    }
}
