using Core.Base.Dto;
using Core.Packs.Dto;
using Core.Packs.Entities;
using Core.Packs.Mapper;
using Core.Packs.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace Infrastructure.Packs.Repos
{
    public class PackBuyRepo : Repo<PackBuy>, IPackBuyRepo
    {
        public PackBuyRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public PackBuy GetCurrentByUserId(string userId)
        {
            var lastPackBuy = GetSet().Where(x => x.UserId == userId).Include(x => x.Pack).OrderByDescending(x => x.PayDate).FirstOrDefault();
            return lastPackBuy;
        }

        public PagedListDto<PackBuyListDto> Search(PageRequestDto<PackBuyListFilterDto> dto)
        {
            var query = GetSet();
            if (dto.MetaData.Status.HasValue)
            {
                query = query.Where(x => x.PayStatus == dto.MetaData.Status.Value);
            }
            if (dto.MetaData.FromToPayDate.From.HasValue)
            {
                query = query.Where(x => x.PayDate >= dto.MetaData.FromToPayDate.From.Value);
            }
            if (dto.MetaData.FromToPayDate.To.HasValue)
            {
                query = query.Where(x => x.PayDate <= dto.MetaData.FromToPayDate.To.Value);
            }
            if (!string.IsNullOrEmpty(dto.MetaData.KeywordDto.Keyword))
            {
                query = query.Where(x => x.User.Name.Contains(dto.MetaData.KeywordDto.Keyword)
                    || x.User.Surname.Contains(dto.MetaData.KeywordDto.Keyword)
                    || x.User.Mobile.Contains(dto.MetaData.KeywordDto.Keyword)
                    || x.Pack.Title.Contains(dto.MetaData.KeywordDto.Keyword));
            }
            if (!string.IsNullOrEmpty(dto.SortField))
            {
                if (dto.Order == Core.Base.Enums.SortOrder.ASC)
                {
                    query = query.OrderBy(dto.SortField);

                }
                else
                {
                    query = query.OrderBy($"{dto.SortField} DESC");
                }
            }
            int count = query.Count();
            var result = query.Include(x => x.User).Include(x => x.Pack).Skip((dto.Index - 1) * dto.Size).Take(dto.Size).ToList();
            return new PagedListDto<PackBuyListDto>
            {
                Count = count,
                Items = result.ToDto()
            };
        }
    }
}
