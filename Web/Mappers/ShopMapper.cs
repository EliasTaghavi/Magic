using Core.Base.Dto;
using Core.QRString.Dto;
using Core.Shop.Dto;
using System.Collections.Generic;
using System.Linq;
using Web.Models;
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
            };
        }

        public static List<ShopWithUserViewModel> ToViewModel(this List<ShopWithUserDto> dto)
        {
            return dto.Select(x => x.ToViewModel()).ToList();
        }
    }
}
