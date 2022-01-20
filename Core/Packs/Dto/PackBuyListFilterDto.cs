using Core.Base.Dto;

namespace Core.Packs.Dto
{
    public class PackBuyListFilterDto
    {
        public bool? Status { get; set; }
        public KeywordDto KeywordDto { get; set; }
        public FromToDto<DateTime?> FromToPayDate { get; set; }
        public string UserId { get; set; }
    }
}
