using System;
namespace Core.Identity.Dto
{
	public class EditUserDto
	{
        public string Id { get; set; }
        public string Name { get; set; }
		public string Surname { get; set; }
		public DateTime Birthday { get; set; }
		public string Address { get; set; }
        public string RefCode { get; set; }

    }
}

