using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Web.JsonConverter;

namespace Web.Models.User
{
	public class EditUserViewModel
	{
        public string Name { get; set; }
        public string Surname { get; set; }
		[JsonConverter(typeof(DateTimeJsonConverter))]
		public DateTime Birthday { get; set; }
		public string Address { get; set; }
		public IFormFile Selfie { get; set; }
		public IFormFile Identity { get; set; }
        public string RefCode { get; set; }
    }
}
