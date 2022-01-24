using Newtonsoft.Json;
using Web.JsonConverter;

namespace Web.Models.Shop
{
    public class ShopWithUserViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string UserFullName { get; set; }
        public string UserMobile { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime CreatedDate { get; set; }
        public int LatestOff { get; set; }
        public string RefCode { get; set; }
    }
}
