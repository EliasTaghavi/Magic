using Core.Base.Entities;

namespace Core.Pack.Entities
{
    public class Pack : BaseEntity
    {
        public int DayCount { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
