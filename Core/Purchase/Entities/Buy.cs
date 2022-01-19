using Core.Base.Entities;
using Core.Identity.Entities;
using Core.Shops.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Purchase.Entities
{
    public class Buy : BaseEntity
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
