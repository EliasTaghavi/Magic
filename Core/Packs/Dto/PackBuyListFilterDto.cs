using Core.Base.Dto;
using System;

namespace Core.Packs.Dto
{
    public class PackBuyListFilterDto
    {
        public bool? Status { get; set; }
        public KeywordDto KeywordDto { get; set; }
        public FromToDto<DateTime?> FromToPayDate { get; set; }
    }
}
