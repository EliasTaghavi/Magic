using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Core.Base.Settings
{
    public class JWTSettings
    {
        public double ExpiryHours { get; set; }
        public string SigningKey { get; set; }
        public string ValidAudience { get; set; }
        public string ValidIssuer { get; set; }
        public bool CheckIP { get; set; }

        public SecurityKey GetIssuerSigningKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SigningKey));
        }
    }
}
