using Core.Base.Entities;

namespace Core.Ticket.Entities
{
    public class Ticket : BaseEntity
    {
        public int DayCount { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
    }
}
