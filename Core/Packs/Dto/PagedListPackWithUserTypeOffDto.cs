using Core.Base.Dto;

namespace Core.Packs.Dto
{
    public class PagedListPackWithUserTypeOffDto
    {
        public PagedListDto<PackListDto> ListDto { get; set; }
        public int Discount { get; set; }
        public bool HasActivePack { get; set; }
    }
}
