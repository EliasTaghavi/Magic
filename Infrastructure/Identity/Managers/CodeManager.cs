using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Identity.Managers;
using Core.Identity.Repos;

namespace Infrastructure.Identity.Managers
{
    public class CodeManager : ICodeManager
    {
        private readonly ICodeRepo codeRepo;

        public CodeManager(ICodeRepo codeRepo)
        {
            this.codeRepo = codeRepo;
        }
        public ManagerResult<PagedListDto<CodeListDto>> Search(PageRequestDto<CodeListFilterDto> dto)
        {
            var result = codeRepo.Search(dto);
            return new ManagerResult<PagedListDto<CodeListDto>>(result);
        }
    }
}
