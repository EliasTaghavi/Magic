using Core.Identity.Enums;
using Newtonsoft.Json;
using Web.JsonConverter;

namespace Web.Models.User
{
    public class UserProfileViewModel
    {
        public string Token { get; set; }
        public UserStatus Status { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime Birthday { get; set; }
        public string SelfieURL { get; set; }
        public string IdentityURL { get; set; }
        public bool HasActivePack { get; set; }
        public List<string> Roles { get; set; }
        public bool IsStudent { get; set; }
        public string TypeId { get; set; }
    }
}
