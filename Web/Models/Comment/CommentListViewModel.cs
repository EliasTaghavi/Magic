using Newtonsoft.Json;
using Web.JsonConverter;

namespace Web.Models.Comment
{
    public class CommentListViewModel
    {
        public string Id { get; set; }
        public string Text { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime AddDate { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
