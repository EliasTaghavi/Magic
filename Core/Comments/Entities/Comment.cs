using Core.Base.Entities;
using Core.Identity.Entities;

namespace Core.Comments.Entities
{
    public class Comment : BaseEntity
    {
        public string Email { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
