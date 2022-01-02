using Core.Pack.Dto;
using Web.Models.Pack;

namespace Web.Mappers
{
    public static class PackMapper
    {
        public static PackFilterDto ToDto(this PackFilterViewModel viewModel)
        {
            return new PackFilterDto
            {
                Title = viewModel.Title,
            };
        }

        public static PackListViewModel ToViewModel(this PackListDto dto)
        {
            return new PackListViewModel
            {
                DayCount = dto.DayCount,
                Description = dto.Description,
                Id = dto.Id,
                Price = dto.Price,
                Title = dto.Title,
            };
        }
    }
}
