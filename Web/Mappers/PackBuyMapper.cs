using Core.Base.Dto;
using Core.Pack.Dto;
using System.Collections.Generic;
using Web.Models;
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
            };
        }

        
    }
}
