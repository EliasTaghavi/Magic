namespace Core.Identity.Dto
{
    public class BuyerDto
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string UserType { get; set; }
        public bool PackStatus { get; set; }
        public int DayRemain { get; set; }
        public DateTime ExpireDate { get; set; }
        public string SelfieUrl { get; set; }
    }
}
