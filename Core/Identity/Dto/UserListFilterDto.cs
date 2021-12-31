using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Identity.Dto
{
    public class UserListFilterDto
    {
        public bool? Confirmed { get; set; }
        public string Mobile { get; set; }
    }
}
