using System.Collections.Generic;

namespace Core.Identity.Interfaces
{
    public interface IJwtTokenHandler
    {
        string GenerateJWTToken(string userId, List<string> roles, string IP);

        string GenerateRefreshToken(int size = 32);
    }
}
