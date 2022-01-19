using Core.Base.Dto;
using Core.Packs.Dto;
using Core.Packs.Mapper;
using Core.Packs.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using System.Linq.Dynamic.Core;

namespace Infrastructure.Packs.Repos
{
    public class PackRepo : Repo<Core.Packs.Entities.Pack>, IPackRepo
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
            query = query.OrderBy("DayCount");
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
