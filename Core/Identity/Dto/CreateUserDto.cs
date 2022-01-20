using Core.Identity.Enums;

namespace Core.Identity.Dto
{
    public class CreateUserDto
    {
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string Lastname { get; set; }
        public UserStatus Status { get; set; }
    }
}
