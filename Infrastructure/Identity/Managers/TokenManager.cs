using Core.Base.Entities;
using Core.Base.Settings;
using Core.Identity.Managers;
using Core.Identity.Repos;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Infrastructure.Identity.Managers
{
    public class TokenManager : ITokenManager
    {

        private readonly ICacheRepo CacheRepo;
        private readonly JWTSettings settings;

        public TokenManager(ICacheRepo cacheRepo, IOptionsMonitor<JWTSettings> options)
        {
            CacheRepo = cacheRepo;
            settings = options.CurrentValue;
        }

        public ManagerResult<bool> CurrentIsDisable(StringValues header)
        {
            string jwt = GetCurrent(header).Result;
            bool result = CacheRepo.Exist(jwt);
            return new ManagerResult<bool>(result);
        }

        public ManagerResult<string> GetCurrent(StringValues header)
        {
            StringValues authorizationHeader = header;

            string result = authorizationHeader == StringValues.Empty
                ? string.Empty
                : authorizationHeader.Single().Split(' ').Last();
            return new ManagerResult<string>(result);
        }

        public ManagerResult<bool> SameIP(StringValues header, string ip)
        {
            JwtSecurityTokenHandler handler = new();
            string jwt = GetCurrent(header).Result;
            JwtSecurityToken obj = handler.ReadToken(jwt) as JwtSecurityToken;
            string ipFromRequest = ip;
            string ipFromJWT = obj.Claims.First(x => x.Type == "IP").Value;
            bool result = (ipFromRequest == ipFromJWT) || !settings.CheckIP;
            return new ManagerResult<bool>(result);
        }
    }
}
