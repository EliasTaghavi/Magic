using System;

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
        public DateTime Birthday { get; set; }
        public string SelfieURL { get; set; }
    }
}
