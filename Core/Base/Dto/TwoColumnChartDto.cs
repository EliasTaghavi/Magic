using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base.Dto
{
    public class TwoColumnChartDto<T>
    {
        public T Column1 { get; set; }
        public T Column2 { get; set; }
        public string Label { get; set; }
    }
}
