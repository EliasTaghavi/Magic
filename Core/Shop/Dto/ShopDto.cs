using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Dto
{
    public class ShopDto
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string ShopLogoUrl { get; set; }
        public List<string> PhotoUrl { get; set; }
    }
}
