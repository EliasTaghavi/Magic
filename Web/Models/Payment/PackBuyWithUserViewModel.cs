using System;

namespace Web.Models.Payment
{
    public class PackBuyWithUserViewModel
    {
        public int Id { get; set; }
        public string UserFullName { get; set; }
        public decimal Price { get; set; }
        public DateTime PayDate { get; set; }
    }
}
