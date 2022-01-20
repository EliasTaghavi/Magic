using Core.Purchase.Dto;
using Web.Models.Purchase;

namespace Web.Mappers
{
    public static class PurchaseMapper
    {
        public static SaveBuyDto ToDto(this SaveBuyViewModel viewModel, string shopKeeperId)
        {
            return new SaveBuyDto
            {
                OrderAmount = viewModel.OrderAmount,
                ShopKeeperId = shopKeeperId,
                ShopperQR = viewModel.ShopperQR,
            };
        }
    }
}
