﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base.Dto
{
    public class LineChartDto<T>
    {
        public T Data { get; set; }
        public string Label { get; set; }
    }
}
