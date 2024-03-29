﻿using Core.File.Entities;
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

        public string GetIdentity(string userId)
        {
            var identity = GetSet().Where(x => x.RefId == userId && x.Type == FileType.Identity).OrderByDescending(x => x.CreatedDate)
                                 .FirstOrDefault();
            return identity?.FullName;
        }

        public List<AppFile> GetPhotos(IEnumerable<string> userIds)
        {
            var list = GetSet().Where(x => userIds.Contains(x.RefId));
            return list.ToList();
        }

        public string GetSelfie(string userId)
        {
            var selfie = GetSet().Where(x => x.RefId == userId && x.Type == FileType.Selfie).OrderByDescending(x => x.CreatedDate)
                                 .FirstOrDefault();
            return selfie?.FullName;
        }
    }
}
