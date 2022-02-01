using Core.Base.Dto;
using Core.Shops.Dto;
using Core.Shops.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using System.Linq.Dynamic.Core;

namespace Infrastructure.Shops.Repos
{
    public class ShopRepo : Repo<Core.Shops.Entities.Shop>, IShopRepo
    {
        public ShopRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public List<string> GerShopsName()
        {
            var names = GetSet().Select(x => x.Name).ToList();
            return names;
        }

        public Core.Shops.Entities.Shop ReadByUserId(string userId)
        {
            var shop = GetSet().Where(x => x.UserId == userId).Include(x => x.Offs.OrderByDescending(y => y.CreatedDate).Take(1)).Include(x => x.Photos).FirstOrDefault();
            return shop;
        }

        public PagedListDto<Core.Shops.Entities.Shop> Search(PageRequestDto<ShopListFilterDto> filterDto)
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
            var result = query.Include(x => x.User).Include(x => x.Offs.OrderByDescending(y => y.CreatedDate).Take(1)).Skip((filterDto.Index - 1) * filterDto.Size).Take(filterDto.Size).ToList();
            return new PagedListDto<Core.Shops.Entities.Shop>
            {
                Count = count,
                Items = result
            };
        }
    }
}
