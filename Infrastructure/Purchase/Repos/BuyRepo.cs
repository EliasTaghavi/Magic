using Core.Base.Dto;
using Core.Purchase;
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

        public List<LineChartDto<decimal>> GetEachShopBuy(string userId)
        {
            var result = GetSet().Where(x => x.UserId == userId).Include(x => x.Shop).GroupBy(x => x.ShopId)
                .Select(x => new LineChartDto<decimal>
                {
                    Label = x.First().Shop.Name,
                    Data = x.Sum(y => y.FullPrice)
                }).ToList();
            return result;
        }

        public List<KeyValueDto<string, string>> GetTenLastBuyer(string id)
        {
            var result = GetSet().Where(x => x.ShopId == id)
                                 .Include(x => x.User)
                                 .OrderByDescending(x => x.CreatedDate)
                                 .GroupBy(x => x.UserId)
                                 .Take(10)
                                 .Select(x => new KeyValueDto<string, string> { Key = x.Key, Value = $"{x.First().User.Name} {x.First().User.Surname}" })
                                 .ToList();
            return result;
        }

        public decimal GetTotalDiscount(string userId, DateTime? start = null, DateTime? end = null)
        {
            var query = GetSet().Where(x => x.UserId == userId);
            if (start.HasValue)
            {
                query = query.Where(x => x.CreatedDate >= start);
            }
            if (end.HasValue)
            {
                query = query.Where(x => x.CreatedDate <= end);
            }

            var totalCost = query.Sum(x => x.FullPrice);
            var totalAfterDiscount = query.Sum(x => x.AfterDiscount);
            
            return totalCost - totalAfterDiscount;
        }
    }
}
