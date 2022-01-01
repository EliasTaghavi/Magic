namespace Core.Identity.Dto
{
    public class VerifyTokenPhoneDto
    {
        public string Phone { get; set; }
        public int Token { get; set; }
        public string IP { get; set; }
    }
}
