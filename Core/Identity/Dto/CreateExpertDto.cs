namespace Core.Identity.Dto
{
    public class CreateExpertDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Password { get; set; }
        public string UserTypeId { get; set; }
    }
}
