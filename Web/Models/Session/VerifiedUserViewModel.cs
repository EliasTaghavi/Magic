﻿using Newtonsoft.Json;
using System;
using Web.JsonConverter;

namespace Web.Models.Session
{
    public class VerifiedUserViewModel
    {
        public string Token { get; set; }
        public bool Confirmed { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        [JsonConverter(typeof(DateTimeJsonConverter))]
        public DateTime Birthday { get; set; }
        public string SelfieURL { get; set; }
    }
}
