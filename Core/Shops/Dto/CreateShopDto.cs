﻿namespace Core.Shops.Dto
{
    public class CreateShopDto
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string UserMobile { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public int LatestOff { get; set; }
        public string Refcode { get; set; }
        public string Password { get; set; }
    }
}
