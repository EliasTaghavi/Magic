using Core.Identity.Entities;
using Core.Identity.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Identity.Repos
{
    public class RoleRepo : Repo<Role>, IRoleRepo
    {
        public RoleRepo(OffDbContext Context) : base(Context)
        {
        }
    }
}
