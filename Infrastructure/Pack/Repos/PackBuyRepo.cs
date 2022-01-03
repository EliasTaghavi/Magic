using Core.Pack.Entities;
using Core.Pack.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Pack.Repos
{
    public class PackBuyRepo : Repo<PackBuy> , IPackBuyRepo
    {
        public PackBuyRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }
    }
}
