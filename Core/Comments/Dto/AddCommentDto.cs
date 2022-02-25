using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Comments.Dto
{
    public class AddCommentDto
    {
        public string Email { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
    }
}
