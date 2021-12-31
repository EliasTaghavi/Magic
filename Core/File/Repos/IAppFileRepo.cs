using Core.Base.Repos;
using Core.File.Entities;
using System.Collections.Generic;

namespace Core.File.Repos
{
    public interface IAppFileRepo : IRepo<AppFile>
    {
        List<AppFile> GetPhotos(IEnumerable<string> userIds);
    }
}
