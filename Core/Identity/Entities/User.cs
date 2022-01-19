using Core.Base.Entities;
using Core.Identity.Enums;

namespace Core.Identity.Entities
{
    public class User : BaseEntity
    {
        public ICollection<AccessToken> AccessTokens { get; private set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Username { get; set; }
        public ICollection<Role> Roles { get; private set; }
        public string Code { get; set; }
        public string NationalId { get; set; }
        public string Serial { get; set; }
        public bool Gender { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birthday { get; set; }
        public string BirthPlaceId { get; set; }
        public string FatherName { get; set; }
        public DateTime IssuedDate { get; set; }
        public string IssuedPlaceId { get; set; }
        public bool FirstLogin { get; set; }
        public string Mobile { get; set; }
        public bool MobileConfirmed { get; set; }
        public string Address { get; set; }
        public UserStatus UserStatus { get; set; }
        public UserType UserType { get; set; }
        public string UserTypeId { get; set; }
        public string RefCode { get; set; }
        public string QRCode { get; set; }

        public User()
        {
            AccessTokens = new List<AccessToken>();
            Roles = new List<Role>();
        }
    }
}
