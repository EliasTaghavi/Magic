using Core.Identity.Entities;
using Core.Identity.Repos;
using Infrastructure.Data;
using System.Linq;

namespace Infrastructure.Identity.Repos
{
    public class CacheRepo : ICacheRepo
    {
        private readonly OffDbContext Context;

        public CacheRepo(OffDbContext context)
        {
            Context = context;
        }

        public void Create(string JWT)
        {
            Context.Caches.Add(new Cache { JWT = JWT });
            Context.SaveChanges();
        }

        public void Delete(string JWT)
        {
            Cache cache = Context.Caches.Find(JWT);
            Context.Caches.Remove(cache);
            Context.SaveChanges();
        }

        public bool Exist(string JWT)
        {
            return Context.Caches.Any(x => x.JWT == JWT);
        }
    }
}
