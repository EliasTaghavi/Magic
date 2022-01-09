using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Pack.Dto
{
    public class PackBuyListDto
    {
        public string Id { get; set; }
        public string UserFullName { get; set; }
        public string UserMobile { get; set; }
        public decimal Price { get; set; }
        public DateTime PayDate { get; set; }
        public bool? Status { get; set; }
    }
}
