using Core.Shops.Entities;
using Core.Shops.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Shops.Repos
{
    public class ShopOffRepo : Repo<ShopOff>, IShopOffRepo
    {
        public ShopOffRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }
    }
}
