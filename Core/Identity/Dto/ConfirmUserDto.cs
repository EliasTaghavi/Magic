using Core.Identity.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Identity.Dto
{
    public class ConfirmUserDto
    {
        public string UserId { get; set; }
        public UserType Type { get; set; }
    }
}
