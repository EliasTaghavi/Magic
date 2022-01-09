using Core.Base.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Pack.Dto
{
    public class PackBuyListFilterDto
    {
        public bool? Status { get; set; }
        public KeywordDto KeywordDto { get; set; }
        public FromToDto<DateTime?> FromToPayDate { get; set; }
    }
}
