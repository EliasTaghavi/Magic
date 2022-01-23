using Core.Identity.Enums;
using Newtonsoft.Json;
using Web.JsonConverter;

namespace Web.Models.User
{
    public class CodeListViewModel
    {
        public string Id { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime CreatedDate { get; set; }
        public int Num { get; set; }
        public int Times { get; set; }
        public TokenType Type { get; set; }
        public string UserName { get; set; }
        public string UserPhone { get; set; }
    }
}
