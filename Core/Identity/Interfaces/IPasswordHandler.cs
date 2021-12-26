using Core.Identity.Entities;

namespace Core.Identity.Interfaces
{
    public interface IPasswordHandler
    {
        PasswordHashResult CreatePasswordHash(string password);

        bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);
    }
}
