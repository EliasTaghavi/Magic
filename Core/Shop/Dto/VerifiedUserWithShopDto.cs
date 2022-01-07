using Core.Identity.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Dto
{
    public class VerifiedUserWithShopDto
    {
        public string Token { get; set; }
        public UserStatus Status { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public DateTime Birthday { get; set; }
        public string SelfieURL { get; set; }
        public ShopDto Shop { get; set; }
    }
}
