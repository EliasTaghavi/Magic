using Core.Base.Dto;
using Core.Shop.Dto;
using Core.Shop.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace Infrastructure.Shop.Repos
{
    public class ShopRepo : Repo<Core.Shop.Entities.Shop>, IShopRepo
    {
        public ShopRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public Core.Shop.Entities.Shop ReadByUserId(string userId)
        {
            var shop = GetSet().Where(x => x.UserId == userId).Include(x => x.Photos).FirstOrDefault();
            return shop;
        }

        public PagedListDto<Core.Shop.Entities.Shop> Search(PageRequestDto<ShopListFilterDto> filterDto)
        {
            var query = GetSet();
            string keyword = filterDto.MetaData.Keyword.Keyword;
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword) || x.User.Name.Contains(keyword) || x.User.Surname.Contains(keyword) || x.User.Mobile.Contains(keyword));
            }
            if (!string.IsNullOrEmpty(filterDto.SortField))
            {
                if (filterDto.Order == Core.Base.Enums.SortOrder.ASC)
                {
                    query = query.OrderBy(filterDto.SortField);

                }
                else
                {
                    query = query.OrderBy($"{filterDto.SortField} DESC");
                }
            }
            int count = query.Count();
            var result = query.Include(x => x.User).Include(x => x.User).Skip((filterDto.Index - 1) * filterDto.Size).Take(filterDto.Size).ToList();
            return new PagedListDto<Core.Shop.Entities.Shop>
            {
                Count = count,
                Items = result
            };
        }
    }
}
