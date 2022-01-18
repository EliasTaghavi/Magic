using Core.Identity.Enums;
using System;

namespace Core.Identity.Dto
{
    public class UserListDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string Address { get; set; }
        public UserStatus Status { get; set; }
        public string Mobile { get; set; }
        public string SelfieURL { get; set; }
        public string IdentityURL { get; set; }
        public DateTime CreatedDate { get; set; }
        public string TypeId { get; set; }
    }
}
