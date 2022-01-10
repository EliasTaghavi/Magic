using System;

namespace Core.Pack.Dto
{
    public class PackBuyListDto
    {
        public string Id { get; set; }
        public string UserFullName { get; set; }
        public string UserMobile { get; set; }
        public decimal Price { get; set; }
        public DateTime PayDate { get; set; }
        public bool? Status { get; set; }
        public string PackTitle { get; set; }
    }
}
