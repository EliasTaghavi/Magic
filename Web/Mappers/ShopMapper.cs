using Core.QRString.Dto;
using Core.Shop.Dto;
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
    }
}
