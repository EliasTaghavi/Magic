using Core.Shops.Dto;

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
                ReferralCode = dto.Refcode,
            };
        }

        public static ShopSimpleDto ToSimpleDto(this Entities.Shop shop)
        {
            return new ShopSimpleDto
            {
                Address = shop.Address,
                Id = shop.Id,
                Name = shop.Name,
            };
        }

        public static List<ShopSimpleDto> ToSimpleDto(this List<Entities.Shop> shops)
        {
            return shops.Select(x => x.ToSimpleDto()).ToList();
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
                RefCode = shop.ReferralCode,
            };
        }

        public static List<ShopWithUserDto> ToDto(this List<Entities.Shop> shop)
        {
            return shop.Select(x => x.ToDto()).ToList();
        }
    }
}
