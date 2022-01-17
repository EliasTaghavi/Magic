using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using Web.JsonConverter;

namespace Web.Models.User
{
    public class UserFillDataViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime Birthday { get; set; }
        public IFormFile Selfie { get; set; }
        public IFormFile Identity { get; set; }
        public string RefCode { get; set; }
    }
}
