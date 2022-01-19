using Core.Base.Settings;
using Core.Identity.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Infrastructure.Identity
{
    public class JwtTokenHandler : IJwtTokenHandler
    {
        private readonly JWTSettings Options;

        public JwtTokenHandler(IOptions<JWTSettings> options)
        {
            Options = options.Value;
        }

        public string GenerateJWTToken(string userId, List<string> roles, string Ip)
        {
            SigningCredentials credentials = new(Options.GetIssuerSigningKey(), SecurityAlgorithms.HmacSha256);
            List<Claim> claims = roles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();
            claims.Add(new Claim(ClaimTypes.UserData, userId));
            claims.Add(new Claim("IP", Ip));
            DateTime date = DateTime.Now.AddHours(Options.ExpiryHours);
            JwtSecurityToken tokenOptions = new(issuer: Options.ValidIssuer,
                                                                 audience: Options.ValidAudience,
                                                                 claims: claims,
                                                                 expires: date,
                                                                 signingCredentials: credentials);
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }

        public string GenerateRefreshToken(int size = 32)
        {
            byte[] randomNumber = new byte[size];
            using RandomNumberGenerator rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
