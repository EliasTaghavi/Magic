using Core.Packs.Dto;

namespace Core.Packs.Mapper
{
    public static class PackMapper
    {
        public static PackListDto ToDto(this Entities.Pack pack)
        {
            return new PackListDto
            {
                Title = pack.Title,
                DayCount = pack.DayCount,
                Description = pack.Description,
                Id = pack.Id,
                Price = pack.Price,
            };
        }

        public static List<PackListDto> ToDto(this List<Entities.Pack> packs)
        {
            return packs.Select(x => x.ToDto()).ToList();
        }
    }
}
