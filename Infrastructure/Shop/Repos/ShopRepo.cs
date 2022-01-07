using Core.Shop.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Shop.Repos
{
    public class ShopRepo : Repo<Core.Shop.Entities.Shop> , IShopRepo
    {
        public ShopRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public Core.Shop.Entities.Shop ReadByUserId(string userId)
        {
            var shop = GetSet().Where(x => x.UserId == userId).Include(x => x.Photos).FirstOrDefault();
            return shop;
        }
    }
}
