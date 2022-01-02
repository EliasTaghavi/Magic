using Core.Identity.Enums;

namespace Web.Models.User
{
    public class UserListFilterViewModel
    {
        public UserStatus? Status { get; set; }
        public string Mobile { get; set; }
    }
}
