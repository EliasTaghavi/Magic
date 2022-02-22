using Core.File.Entities;
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
                Id = shop.Id,
                Name = shop.Name,
            };
        }

        public static List<ShopSimpleDto> ToSimpleDto(this List<Entities.Shop> shops)
        {
            return shops.Select(x => x.ToSimpleDto()).ToList();
        }

        public static ShopWithUserDto ToDto(this Entities.Shop shop, List<AppFile> valuePairs)
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
                Photos = valuePairs?.Where(x => x.RefId == shop.Id).Select(x => x.FullName).ToList()
            };
        }

        public static List<ShopWithUserDto> ToDto(this List<Entities.Shop> shop, List<AppFile> valuePairs)
        {
            return shop.Select(x => x.ToDto(valuePairs)).ToList();
        }
    }
}
