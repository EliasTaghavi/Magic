using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Shop.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Managers
{
    public interface IShopManager
    {
        ManagerResult<bool> AddPhotos(AddPhotosForShopDto dto);
        ManagerResult<VerifiedUserWithShopDto> VerifyTokenByPhoneForShop(VerifyTokenPhoneDto verifyTokenPhoneDto);
    }
}
