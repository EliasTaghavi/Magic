using Core.Base.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Ticket.Entities
{
    public class Ticket : BaseEntity
    {
        public int DayCount { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
    }
}
