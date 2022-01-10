using Newtonsoft.Json;
using System;
using Web.JsonConverter;

namespace Web.Models.Payment
{
    public class PackBuyWithUserViewModel
    {
        public string Id { get; set; }
        public string UserFullName { get; set; }
        public decimal Price { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime PayDate { get; set; }
        public bool? Status { get; set; }
        public string PackTitle { get; set; }
    }
}
