using Core.Base.Entities;
using Core.QRString.Dto;

namespace Core.QRString.Managers
{
    public interface IQRStringManager
    {
        ManagerResult<string> CreateNewQR(string userId);
        ManagerResult<string> GetCurrent(string userId);
        ManagerResult<BuyerDto> GetBuyer(ShopBuyerDto dto);
    }
}
