using Core.Base.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Entities
{
    public class ShopOff : BaseEntity
    {
        public int Percentage { get; set; }
        public string ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
