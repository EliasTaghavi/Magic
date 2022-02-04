using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base.Dto
{
    public class ChartNode<T,R>
    {
        public T X { get; set; }
        public R Y { get; set; }
    }
}
