using Core.Identity.Enums;

namespace Web.Models.User
{
    public class CodeListFilterViewModel
    {
        public KeywordViewModel Keyword { get; set; }
        public TokenType? Type { get; set; }
    }
}
