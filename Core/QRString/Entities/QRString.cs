using Core.Base.Entities;
using Core.Identity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QRString.Entities
{
    public class QRString : BaseEntity
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string QR { get; set; }
    }
}
