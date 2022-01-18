using Core.Shops.Dto;
using System.Collections.Generic;
using System.Linq;

namespace Core.Shops.Mappers
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

        public static ShopWithUserDto ToDto(this Entities.Shop shop)
        {
            return new ShopWithUserDto
            {
                Address = shop.Address,
                Id = shop.Id,
                Name = shop.Name,
                Phone = shop.Phone,
                UserFullName = $"{shop.User.Name} {shop.User.Surname}",
                UserMobile = shop.User.Mobile,
                CreatedDate = shop.CreatedDate,
                LatestOff = shop.Offs?.FirstOrDefault()?.Percentage ?? 0,
            };
        }

        public static List<ShopWithUserDto> ToDto(this List<Entities.Shop> shop)
        {
            return shop.Select(x => x.ToDto()).ToList();
        }
    }
}
