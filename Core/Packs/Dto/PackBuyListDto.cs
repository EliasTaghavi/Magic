namespace Core.Packs.Dto
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
