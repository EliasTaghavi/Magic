using Core.File.Entities;
using Core.File.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.File.Repos
{
    public class AppFileRepo : Repo<AppFile>, IAppFileRepo
    {
        public AppFileRepo(OffDbContext Context) : base(Context)
        {
        }
    }
}
