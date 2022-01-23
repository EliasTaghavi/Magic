using Core.Base.Dto;
using Core.Identity.Dto;
using Web.Models;
using Web.Models.User;

namespace Web.Mappers
{
    public static class CodeMapper
    {
        public static CodeListFilterDto ToDto(this CodeListFilterViewModel viewModel)
        {
            return new CodeListFilterDto
            {
                Keyword = viewModel.Keyword.ToDto(),
                Type = viewModel.Type
            };
        }

        public static PageRequestDto<CodeListFilterDto> ToDto(this PageRequestViewModel<CodeListFilterViewModel> viewModel)
        {
            return viewModel.ToDto(x => x.ToDto());
        }

        public static CodeListViewModel ToViewModel(this CodeListDto dto)
        {
            return new CodeListViewModel
            {
                CreatedDate = dto.CreatedDate,
                Id = dto.Id,
                Num = dto.Num,
                Times = dto.Times,
                Type = dto.Type,
                UserName = dto.UserName,
                UserPhone = dto.UserPhone,
            };
        }
    }
}
