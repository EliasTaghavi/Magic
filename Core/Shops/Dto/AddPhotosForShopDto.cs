using Core.Base.Dto;

namespace Core.Shops.Dto
{
    public class AddPhotosForShopDto
    {
        public List<InputFileDto> InputFileDtos { get; set; }
        public string ShopId { get; set; }
    }
}
