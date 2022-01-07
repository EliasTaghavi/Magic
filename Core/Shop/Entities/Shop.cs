using Core.Base.Entities;
using Core.File.Entities;
using Core.Identity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Entities
{
    public class Shop : BaseEntity
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public ICollection<AppFile> Photos { get; set; }
    }
}
