using Core.Purchase.Entities;
using Core.Purchase.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Purchase.Repos
{
    public class BuyRepo : Repo<Buy>, IBuyRepo
    {
        public BuyRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }
    }
}
