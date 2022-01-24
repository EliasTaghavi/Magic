using Core.Identity.Enums;

namespace Core.Identity.Dto
{
    public class CodeListDto
    {
        public string Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Num { get; set; }
        public int Times { get; set; }
        public TokenType Type { get; set; }
        public string UserName { get; set; }
        public string UserPhone { get; set; }
    }
}
