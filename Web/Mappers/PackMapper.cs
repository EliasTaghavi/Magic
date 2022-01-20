using Core.Packs.Dto;
using Core.Packs.Entities;
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

        public static Pack ToDataModel(this CreatePackViewModel viewModel)
        {
            return new Pack
            {
                Title = viewModel.Title,
                Price = viewModel.Price,
                DayCount = viewModel.DayCount,
                Description = viewModel.Description,
                ObjectState = Core.Base.Enums.ObjectState.Added
            };
        }

        public static CreateInvoiceDto ToDto(this CreateInvoiceViewModel viewModel, string userId)
        {
            return new CreateInvoiceDto
            {
                PackId = viewModel.PackId,
                UserId = userId,
            };
        }

        public static CurrentPackViewModel ToViewModel(this CurrentPackDto currentPackDto)
        {
            if (currentPackDto == null)
            {
                return null;
            }
            return new CurrentPackViewModel
            {
                DaysCount = currentPackDto.DaysCount,
                Description = currentPackDto.Description,
                PayDate = currentPackDto.PayDate,
                Price = currentPackDto.Price,
                Title = currentPackDto.Title,
                DaysRemain = (currentPackDto.PayDate.AddDays(currentPackDto.DaysCount) - System.DateTime.UtcNow).Days,
                EndDate = currentPackDto.PayDate.AddDays(currentPackDto.DaysCount)
            };
        }

        public static PagedListPackWithUserTypeOffViewModel ToViewModel(this PagedListPackWithUserTypeOffDto dto)
        {
            return new PagedListPackWithUserTypeOffViewModel
            {
                Discount = dto.Discount,
                List = dto.ListDto.ToViewModel(x => x.ToViewModel()),
            };
        }
    }
}
