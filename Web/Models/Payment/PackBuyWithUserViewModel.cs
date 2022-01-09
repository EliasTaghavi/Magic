using System;

namespace Web.Models.Payment
{
    public class PackBuyWithUserViewModel
    {
        public string Id { get; set; }
        public string UserFullName { get; set; }
        public decimal Price { get; set; }
        public DateTime PayDate { get; set; }
    }
}
