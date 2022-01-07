﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Pack.Dto
{
    public class CurrentPackDto
    {
        public string Title { get; set; }
        public int DaysCount { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime PayDate { get; set; }
    }
}