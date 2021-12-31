using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base.Dto
{
    public class PagedListDto<T>
    {
        public int Count { get; set; }
        public List<T> Items { get; set; }
    }
}
