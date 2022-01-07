using Core.Base.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Repos
{
    public interface IShopRepo : IRepo<Core.Shop.Entities.Shop>
    {
        Entities.Shop ReadByUserId(string userId);
    }
}
