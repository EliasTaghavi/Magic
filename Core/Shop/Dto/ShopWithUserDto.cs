using System;

namespace Core.Shop.Dto
{
    public class ShopWithUserDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string UserFullName { get; set; }
        public string UserMobile { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
