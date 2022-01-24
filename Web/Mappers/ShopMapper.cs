using Core.Identity.Dto;
using Core.Shops.Dto;
using Web.Models.Shop;

namespace Web.Mappers
{
    public static class ShopMapper
    {
        public static ShopBuyerDto ToDto(this GetBuyerViewModel viewModel, string shoperId)
        {
            return new ShopBuyerDto
            {
                ShoperId = shoperId,
                UserId = viewModel.UserId,
            };
        }

        public static CreateShopDto ToDto(this CreateShopViewModel viewModel)
        {
            return new CreateShopDto
            {
                Address = viewModel.Address,
                Name = viewModel.Name,
                Phone = viewModel.Phone,
                UserMobile = viewModel.UserMobile,
                UserName = viewModel.UserName,
                UserSurname = viewModel.UserSurname,
                LatestOff = viewModel.LatestOff,
            };
        }

        public static ShopListFilterDto ToDto(this ShopListFilterViewModel viewModel)
        {
            return new ShopListFilterDto
            {
                Keyword = viewModel.Keyword.ToDto(),
            };
        }

        public static ShopWithUserViewModel ToViewModel(this ShopWithUserDto dto)
        {
            return new ShopWithUserViewModel
            {
                Address = dto.Address,
                Id = dto.Id,
                Name = dto.Name,
                Phone = dto.Phone,
                UserFullName = dto.UserFullName,
                UserMobile = dto.UserMobile,
                CreatedDate = dto.CreatedDate,
                LatestOff = dto.LatestOff,
                RefCode = dto.RefCode,
            };
        }

        public static List<ShopWithUserViewModel> ToViewModel(this List<ShopWithUserDto> dto)
        {
            return dto.Select(x => x.ToViewModel()).ToList();
        }

        public static UpdateShopOffDto ToDto(this UpdateShopOffViewModel viewModel)
        {
            return new UpdateShopOffDto
            {
                Percentage = viewModel.Percentage,
                ShopId = viewModel.ShopId,
            };
        }

        public static BuyerViewModel ToViewModel(this BuyerDto dto)
        {
            return new BuyerViewModel
            {
                DayRemain = dto.DayRemain,
                ExpireDate = dto.ExpireDate,
                Lastname = dto.Lastname,
                Name = dto.Name,
                PackStatus = dto.PackStatus,
                SelfieUrl = dto.SelfieUrl,
                Discount = dto.ShopOff,
                UserType = dto.UserType,
            };
        }
    }
}
