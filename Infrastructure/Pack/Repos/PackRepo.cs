using Core.Base.Dto;
using Core.Base.Enums;
using Core.Pack.Dto;
using Core.Pack.Mapper;
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

        public PagedListDto<PackListDto> Search(PageRequestDto<PackFilterDto> dto)
        {
            var query = GetSet();
            if (!string.IsNullOrEmpty(dto.MetaData.Title))
            {
                query = query.Where(x => x.Title.Contains(dto.MetaData.Title));
            }
            query = query.OrderBy(x => x.DayCount);
            int count = query.Count();
            var result = query.Skip((dto.Index - 1) * dto.Size).Take(dto.Size).ToList();
            return new PagedListDto<PackListDto>
            {
                Count = count,
                Items = result.ToDto()
            };
        }
    }
}
