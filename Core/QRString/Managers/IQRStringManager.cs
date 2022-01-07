using Core.Base.Entities;
using Core.QRString.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QRString.Managers
{
    public interface IQRStringManager
    {
        ManagerResult<string> CreateNewQR(string userId);
        ManagerResult<string> GetCurrent(string userId);
        ManagerResult<BuyerDto> GetBuyer(ShopBuyerDto dto);
    }
}
