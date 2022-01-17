using Core.Identity.Enums;

namespace Core.Identity.Dto
{
    public class UserListFilterDto
    {
        public UserStatus? Status { get; set; }
        public string Mobile { get; set; }
    }
}
