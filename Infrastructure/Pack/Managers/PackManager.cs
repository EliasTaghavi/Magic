using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Repos;
using Core.Packs.Dto;
using Core.Packs.Managers;
using Core.Packs.Repos;

namespace Infrastructure.Packs.Managers
{
    public class PackManager : IPackManager
    {
        private readonly IPackRepo packRepo;
        private readonly IPackBuyRepo packBuyRepo;
        private readonly IUserRepo userRepo;

        public PackManager(IPackRepo packRepo,
                           IPackBuyRepo packBuyRepo,
                           IUserRepo userRepo)
        {
            this.packRepo = packRepo;
            this.packBuyRepo = packBuyRepo;
            this.userRepo = userRepo;
        }

        public ManagerResult<bool> Create(Core.Packs.Entities.Pack data)
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
            var packBuy = packBuyRepo.GetSet().Where(x => x.UserId == userId && x.PayStatus == true).Include(x => x.Pack).OrderByDescending(x => x.PayDate).FirstOrDefault();

            if (packBuy != null)
            {
                var daysRemain = (packBuy.PayDate.Value.AddDays(packBuy.Pack.DayCount) - System.DateTime.UtcNow).Days;
                if (daysRemain < 0)
                {
                    return new ManagerResult<CurrentPackDto>()
                    {
                        Code = 21,
                        Message = "ExpirePackage"
                    };
                }
                CurrentPackDto dto = new()
                {
                    DaysCount = packBuy.Pack.DayCount,
                    Description = packBuy.Pack.Description,
                    PayDate = packBuy.PayDate.Value,
                    Price = packBuy.Pack.Price,
                    Title = packBuy.Pack.Title,
                };
                return new ManagerResult<CurrentPackDto>(dto, true);
            }
            else
            {
                return new ManagerResult<CurrentPackDto>()
                {
                    Success = false,
                    Result = null,
                    Code = 20,
                    Message = "NoPackage"
                };
            }
        }

        public ManagerResult<PagedListDto<PackListDto>> Search(PageRequestDto<PackFilterDto> dto)
        {
            var result = packRepo.Search(dto);
            return new ManagerResult<PagedListDto<PackListDto>>(result);
        }

        public ManagerResult<PagedListPackWithUserTypeOffDto> List(PageRequestDto<PackFilterDto> dto, string userId)
        {
            var result = packRepo.Search(dto);
            var user = userRepo.ReadWithType(userId);
            var xResult = new PagedListPackWithUserTypeOffDto
            {
                Discount = user.UserType.Discount,
                ListDto = result,
            };
            return new ManagerResult<PagedListPackWithUserTypeOffDto>(xResult);
        }
    }
}
