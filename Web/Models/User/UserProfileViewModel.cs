using Core.Identity.Enums;

namespace Web.Models.User
{
    public class UserProfileViewModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birthday { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public UserStatus UserStatus { get; set; }
        public string UserTypeTitle { get; set; }
        public string RefCode { get; set; }
        public string QRCode { get; set; }
        public string IdentityURL { get; set; }
        public string SelfieURL { get; set; }
    }
}
