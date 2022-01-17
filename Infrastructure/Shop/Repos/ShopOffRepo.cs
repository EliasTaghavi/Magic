using Core.Shop.Entities;
using Core.Shop.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Shop.Repos
{
    public class ShopOffRepo : Repo<ShopOff>, IShopOffRepo
    {
        public ShopOffRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }
    }
}
