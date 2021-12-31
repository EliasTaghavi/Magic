using Core.File.Entities;
using Core.File.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.File.Repos
{
    public class AppFileRepo : Repo<AppFile>, IAppFileRepo
    {
        public AppFileRepo(OffDbContext Context) : base(Context)
        {
        }

        public List<AppFile> GetPhotos(IEnumerable<string> userIds)
        {
            var list = GetSet().Where(x => userIds.Contains(x.Id));
            return list.ToList();
        }
    }
}
