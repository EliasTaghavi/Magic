using System;

namespace Core.Identity.Entities
{
    public class UserRole
    {
        public DateTime CreatedDate { get; set; }
        public bool Enable { get; set; }
        public Role Role { get; set; }
        public string RoleId { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
    }
}
