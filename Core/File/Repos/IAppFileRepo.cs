using Core.Base.Repos;
using Core.File.Entities;

namespace Core.File.Repos
{
    public interface IAppFileRepo : IRepo<AppFile>
    {
        List<AppFile> GetPhotos(IEnumerable<string> userIds);
        string GetSelfie(string userId);
    }
}
