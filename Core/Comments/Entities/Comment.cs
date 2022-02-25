using Core.Base.Entities;
using Core.Identity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
