using System.Collections.Generic;

namespace Web.Models
{
    public class LineChartViewModel<T>
    {
        public List<T> Data { get; set; }
        public List<string> Label { get; set; }
    }
}
