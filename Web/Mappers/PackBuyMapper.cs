using Core.Packs.Dto;
using Web.Models.Payment;

namespace Web.Mappers
{
    public static class PackBuyMapper
    {
        public static PackBuyWithUserViewModel ToViewModel(this PackBuyListDto dto)
        {
            return new PackBuyWithUserViewModel
            {
                Id = dto.Id,
                PayDate = dto.PayDate,
                Price = dto.Price,
                UserFullName = dto.UserFullName,
                Status = dto.Status,
                PackTitle = dto.PackTitle,
                UserMobile = dto.UserMobile,
            };
        }

        public static PackBuyListFilterDto ToDto(this PackBuyListFilterViewModel viewModel, string userId = default)
        {
            return new PackBuyListFilterDto
            {
                FromToPayDate = viewModel.FromToPayDate.ToDto(),
                KeywordDto = viewModel.Keyword.ToDto(),
                Status = viewModel.Status,
                UserId = userId,
            };
        }
    }
}
