using Core.Base.Dto;
using System.Collections.Generic;

namespace Core.Shop.Dto
{
    public class AddPhotosForShopDto
    {
        public List<InputFileDto> InputFileDtos { get; set; }
        public string UserId { get; set; }
    }
}
