using Core.Purchase.Dto;
using Web.Models.Purchase;

namespace Web.Mappers
{
    public static class PurchaseMapper
    {
        public static SaveBuyDto ToDto(this SaveBuyViewModel viewModel)
        {
            return new SaveBuyDto
            {
                OrderAmount = viewModel.OrderAmount,
                ShopKeeperId = viewModel.ShopKeeperId,
                ShopperQR = viewModel.ShopperQR,
            };
        }
    }
}
