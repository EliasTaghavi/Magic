using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Comments.Dto
{
    public class CommentFilterDto
    {
        public string Text { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
