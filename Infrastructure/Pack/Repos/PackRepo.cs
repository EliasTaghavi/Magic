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
    public class PackRepo : Repo<Core.Pack.Entities.Pack> , IPackRepo
    {
        public PackRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }
    }
}
