using System;

namespace Core.Packs.Dto
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
