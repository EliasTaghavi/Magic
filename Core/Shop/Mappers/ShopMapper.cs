using Core.Shop.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Shop.Mappers
{
    public static class ShopMapper
    {
        public static Entities.Shop ToDataModel(this CreateShopDto dto)
        {
            return new Entities.Shop
            {
                Address = dto.Address,
                Name = dto.Name,
                Phone = dto.Phone,
            };
        }
    }
}
