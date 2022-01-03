using Core.Base.Dto;
using Core.Base.Entities;
using Core.Pack.Dto;
using Core.Pack.Managers;
using Core.Pack.Repos;

namespace Infrastructure.Pack.Managers
{
    public class PackManager : IPackManager
    {
        private readonly IPackRepo packRepo;

        public PackManager(IPackRepo packRepo)
        {
            this.packRepo = packRepo;
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

        public ManagerResult<PagedListDto<PackListDto>> Search(PageRequestDto<PackFilterDto> dto)
        {
            var result = packRepo.Search(dto);
            return new ManagerResult<PagedListDto<PackListDto>>(result);
        }
    }
}
