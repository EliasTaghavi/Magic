using Core.Pack.Entities;
using Core.Pack.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure.Pack.Repos
{
    public class PackBuyRepo : Repo<PackBuy>, IPackBuyRepo
    {
        public PackBuyRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public PackBuy GetCurrentByUserId(string userId)
        {
            var lastPackBuy = GetSet().Where(x => x.UserId == userId).Include(x => x.Pack).OrderByDescending(x => x.PayDate).FirstOrDefault();
            return lastPackBuy;
        }
    }
}
