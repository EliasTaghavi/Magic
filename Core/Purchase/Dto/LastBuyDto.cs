namespace Core.Purchase.Dto
{
    public class LastBuyDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public decimal FullPrice { get; set; }
        public decimal AfterDiscount { get; set; }
        public decimal Discount => 100 - (100 * AfterDiscount / FullPrice);
    }
}
