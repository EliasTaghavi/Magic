﻿using Core.Packs.Dto;
using Core.Packs.Entities;

namespace Core.Packs.Mapper
{
    public static class PackBuyMapper
    {
        public static PackBuyListDto ToDto(this PackBuy packBuy)
        {
            return new PackBuyListDto
            {
                Id = packBuy.Id,
                PayDate = packBuy.PayDate.GetValueOrDefault(),
                Price = packBuy.Pack.Price,
                Status = packBuy.PayStatus,
                UserFullName = $"{packBuy.User.Name} {packBuy.User.Surname}",
                UserMobile = packBuy.User.Mobile,
                PackTitle = packBuy.Pack.Title,
            };
        }

        public static List<PackBuyListDto> ToDto(this List<PackBuy> packBuy)
        {
            return packBuy.Select(x => x.ToDto()).ToList();
        }
    }
}
