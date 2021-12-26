namespace Core.Identity.Entities
{
    public class PasswordHashResult
    {
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
