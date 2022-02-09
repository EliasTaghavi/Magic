using Core.File.Entities;
using Core.File.Enums;
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

        public List<AppFile> GetPhotos(IEnumerable<string> userIds)
        {
            var list = GetSet().Where(x => userIds.Contains(x.UserId));
            return list.ToList();
        }

        public string GetSelfie(string userId)
        {
            var selfie = GetSet().Where(x => x.UserId == userId && x.Type == FileType.Selfie)
                                 .FirstOrDefault();
            return selfie?.FullName;
        }
    }
}
