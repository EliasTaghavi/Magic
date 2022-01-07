using Core.QRString.Dto;
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
    }
}
