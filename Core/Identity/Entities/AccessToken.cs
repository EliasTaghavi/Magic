using Core.Base.Entities;

namespace Core.Identity.Entities
{
    public class AccessToken : BaseEntity
    {
        public string Ip { get; set; }
        public string JWT { get; set; }
        public string RefreshToken { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
    }
}
