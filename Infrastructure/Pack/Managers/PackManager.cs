using Core.Base.Dto;
using Core.Base.Entities;
using Core.Pack.Dto;
using Core.Pack.Managers;
using Core.Pack.Repos;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure.Pack.Managers
{
    public class PackManager : IPackManager
    {
        private readonly IPackRepo packRepo;
        private readonly IPackBuyRepo packBuyRepo;

        public PackManager(IPackRepo packRepo, IPackBuyRepo packBuyRepo)
        {
            this.packRepo = packRepo;
            this.packBuyRepo = packBuyRepo;
        }

        public ManagerResult<bool> Create(Core.Pack.Entities.Pack data)
        {
            packRepo.Create(data);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Delete(string id)
        {
            packRepo.Delete(id);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<CurrentPackDto> GetCurrent(string userId)
        {
            var packBuy = packBuyRepo.GetSet().Where(x => x.UserId == userId && x.PayStatus == true).Include(x => x.Pack).OrderBy(x => x.PayDate).FirstOrDefault();
            if (packBuy == null)
            {
                return new ManagerResult<CurrentPackDto>()
                {
                    Code = 20,
                    Message = "NoPackage"
                };
            }
            CurrentPackDto dto = new CurrentPackDto
            {
                DaysCount = packBuy.Pack.DayCount,
                Description = packBuy.Pack.Description,
                PayDate = packBuy.PayDate.Value,
                Price = packBuy.Pack.Price,
                Title = packBuy.Pack.Title,
            };
            return new ManagerResult<CurrentPackDto>(dto, true);
        }

        public ManagerResult<PagedListDto<PackListDto>> Search(PageRequestDto<PackFilterDto> dto)
        {
            var result = packRepo.Search(dto);
            return new ManagerResult<PagedListDto<PackListDto>>(result);
        }
    }
}
