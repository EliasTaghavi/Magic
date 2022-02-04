using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base.Dto
{
    public class ColumnChartDto
    {
        public List<ChartNode<string,decimal>> Data { get; set; }
        public string Label { get; set; }
    }
}
