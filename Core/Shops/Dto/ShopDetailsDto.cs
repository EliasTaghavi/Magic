namespace Core.Shops.Dto
{
    public class ShopDetailsDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string UserFullName { get; set; }
        public DateTime CreatedDate { get; set; }
        public int LatestOff { get; set; }
        public string RefCode { get; set; }
        public List<string> Photos { get; set; }
    }
}
