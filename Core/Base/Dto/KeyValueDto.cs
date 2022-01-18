using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base.Dto
{
    public class KeyValueDto<T,R>
    {
        public T Key { get; set; }
        public R Value { get; set; }
    }
}
