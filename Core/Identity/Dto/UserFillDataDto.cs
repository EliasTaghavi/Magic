using System;

namespace Core.Identity.Dto
{
    public class UserFillDataDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string RefCode { get; set; }
    }
}
