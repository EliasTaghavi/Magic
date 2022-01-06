using Newtonsoft.Json;
using System;
using Web.JsonConverter;

namespace Web.Models.Pack
{
    public class CurrentPackViewModel
    {
        public string Title { get; set; }
        public int DaysCount { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int DaysRemain { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime PayDate { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime EndDate { get; set; }
    }
}
