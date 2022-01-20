using Core.Identity.Entities;
using Core.Identity.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Identity.Repos
{
    public class TokenRepo : Repo<AccessToken>, ITokenRepo
    {
        private readonly DbSet<AccessToken> Tokens;

        public TokenRepo(OffDbContext Context) : base(Context)
        {
            Tokens = Context.Tokens;
        }

        public new void Disable(string jwt)
        {
            AccessToken token = Tokens.FirstOrDefault(x => x.JWT == jwt);
            token.Enable = false;
            Update(token);
        }

        public AccessToken ReadByJWT(string jwt)
        {
            return Tokens.FirstOrDefault(x => x.JWT == jwt);
        }
    }
}
