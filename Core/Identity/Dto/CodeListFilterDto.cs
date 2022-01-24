using Core.Base.Dto;
using Core.Identity.Enums;

namespace Core.Identity.Dto
{
    public class CodeListFilterDto
    {
        public KeywordDto Keyword { get; set; }
        public TokenType? Type { get; set; }
    }
}
