using Core.Base.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Packs.Dto
{
    public class PagedListPackWithUserTypeOffDto
    {
        public PagedListDto<PackListDto> ListDto { get; set; }
        public int Discount { get; set; }
    }
}
