using Newtonsoft.Json;
using Web.JsonConverter;

namespace Web.Models.Shop
{
    public class BuyerViewModel
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string UserType { get; set; }
        public bool PackStatus { get; set; }
        public int DayRemain { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime ExpireDate { get; set; }
        public string SelfieUrl { get; set; }
        public int Discount { get; set; }
    }
}
