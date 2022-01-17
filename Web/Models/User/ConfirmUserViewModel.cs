using Core.Identity.Enums;

namespace Web.Models.User
{
    public class ConfirmUserViewModel
    {
        public string UserId { get; set; }
        public UserType Type { get; set; }
    }
}
