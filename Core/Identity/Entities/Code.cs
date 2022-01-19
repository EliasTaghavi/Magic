using Core.Identity.Enums;

namespace Core.Identity.Entities
{
    public class Code
    {
        public string Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Num { get; set; }
        public int Times { get; set; }
        public TokenType Type { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
