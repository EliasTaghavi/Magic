using Core.Identity.Enums;
using Newtonsoft.Json;
using System;
using Web.JsonConverter;

namespace Web.Models.User
{
    public class UserListViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime Birthday { get; set; }
        public string Address { get; set; }
        public UserStatus Status { get; set; }
        public string Mobile { get; set; }
        public string SelfieURL { get; set; }
        public string IdentityURL { get; set; }
    }
}
